package packetDecoding

import (

	"net"
	"time"
	"bufio"
	"encoding/hex"
)

//Purpose: Check for an error, and panic if necessary
//Params: error
//Returns:
//	Nothing
//Prints:
//	Nothing
func CheckError (e error) {
	if e != nil {
		panic(e)
	}
}

//var Connect net.Conn

//Only 1 connection for the entire server!
type Connection struct {
	connect net.Conn
	quit    chan struct{}
	ticker  *time.Ticker
	packets chan string
}

func (c Connection) CloseListen() {
	close(c.quit)
	dis := []byte( "DISCONNECT")
	c.connect.Write(dis)
	c.connect.Close()
}

//TODO "5. Every 2 minutes, if no traffic has been sent by the server, it sends the message "*KEEPALIVE" instead.
//	// 	This permits the client to assume the server has disappeared if nothing has been received for
//	// 	over 2 minutes, and then gracefully conclude the session."


// Get the latest and greatest Train Information
func (c *Connection) GetTrainInfo() *TrainInfo{
	println("ALMOST HERE")
	for {
		select {
		case data := <- c.packets:
			println("HERHERE")
			return NewTrainInfo(data)
		}
	}
	//data := <- c.packets
	//println("HERHERE")
	//return NewTrainInfo(data)
}

func (c *Connection) keepAlive() {
	for { //infinite loop polling (not very efficient, but works)
		select {
		case <- c.ticker.C: // every tick,
			buf := []byte("Thanks")
			_,err := c.connect.Write(buf) //send a thanks message

			CheckError(err)
		case <- c.quit: // if we cancel
			c.ticker.Stop()	//stop
			return
		}
	}
}

func (c *Connection) listen() {
	for {
		select {
		case <-c.quit:
		// if we cancel
			c.ticker.Stop()        //stop
			println("STOP")
			return
		default:
			data := bufio.NewReader(c.connect)
		// Assume the message is giant - 8 Blocks of 60 bit frames
			p := make([]byte, 60)
			_, err := data.Read(p)
			CheckError(err)
			println("LISTENED")
			c.packets <- hex.Dump(p)
		}

	}
}
//initialize the connection
func  NewConnection() *Connection {
	c := new(Connection)
	url := "NS-HbgDiv.dyndns.org"
	//"1. The ATCSMon client opens a TCP connection to the published server IP address and listener port (usually 4800)
	// 	on the ATCSMon server, and waits for data arrival."
	var conn net.Conn
	var port string

	// connect to this socket
	var connect = func() {
		conn,_ = net.Dial("tcp", url + ":4800")
		//CheckError(err)
		port, _ = bufio.NewReader(conn).ReadString('\n')
		//CheckError(err)
		println("Message from server (Port Number): "+port)
	}

	connect()
	c.ticker = time.NewTicker(1 * time.Minute) //create a new ticker to go off every minute

	//If we were rejected, try again every minute.
	for port == "Rejected" {
		select {
		case <- c.ticker.C: // every tick,
			connect()
		//CheckError(err)
		case <- c.quit: // if we cancel
			c.ticker.Stop()	//stop
			return nil
		}
	}

	//Close the TCP connection
	conn.Close()
	println("here1")

	//Prepare for UDP traffic
	serverAddr,err := net.ResolveUDPAddr("udp", url + ":" + port)
	CheckError(err)

	//Start the connection to the UDP server
	//If we leave the local address nil, it will resolve itself.
	c.connect, err = net.DialUDP("udp", nil, serverAddr)
	CheckError(err)
	println("here2")

	buf := []byte("Thanks")
	_,err = c.connect.Write(buf)
	c.packets = make(chan string)
	c.quit = make(chan struct{}) //thread safe data channel
	go c.keepAlive() // keep the connection alive
	go c.listen() // listen for packets
	println("here3")
	return c
}



