package packetDecoding

import (

	"net"
	"time"
	"bufio"
	"encoding/hex"
	//"fmt"
	"fmt"
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

//func init() {
//	InitConnection()
//}

//Only 1 connection for the entire server!
//type Connection struct {
//	connect net.Conn
//	quit    chan struct{}
//	ticker  *time.Ticker
//	packets chan string
//}

var (
	connect net.Conn
	quit    chan struct{}
	ticker  *time.Ticker
	packets chan string
)

//DON'T forget to call stop to close the connection!
func Stop() {
	close(quit)
	dis := []byte( "DISCONNECT")
	connect.Write(dis)
	connect.Close()
}

//TODO "5. Every 2 minutes, if no traffic has been sent by the server, it sends the message "*KEEPALIVE" instead.
//	// 	This permits the client to assume the server has disappeared if nothing has been received for
//	// 	over 2 minutes, and then gracefully conclude the session."


// Get the latest and greatest Train Information.
// Will wait for the server to get a packet, before returning that packet.
func GetTrainInfo() *TrainInfo{
	for {
		select {
		case data := <- packets:
			return NewTrainInfo(data)
		}
	}
	//data := <- c.packets
	//println("HERHERE")
	//return NewTrainInfo(data)
}

func keepAlive() {
	for { //infinite loop polling (not very efficient, but works)
		select {
		case <- ticker.C: // every tick,
			buf := []byte("Thanks")
			_,err := connect.Write(buf) //send a thanks message

			CheckError(err)
		case <- quit: // if we cancel
			ticker.Stop()	//stop
			return
		}
	}
}

func listen() {
	for {
		select {
		case <-quit:
		// if we cancel
			ticker.Stop()        //stop
			println("STOP")
			return
		default:
			data := bufio.NewReader(connect)
		// Assume the message is giant - 8 Blocks of 60 bit frames
			p := make([]byte, 60)
			_, err := data.Read(p)
			CheckError(err)
			str := hex.EncodeToString(p)
			//fmt.Printf("HEX: %s \n", str)
			packets <- str//hex.Dump(p)
		}

	}
}
//initialize the connection
func InitConnection() {
	//c := new(Connection)
	url := "NS-HbgDiv.dyndns.org"
	//"1. The ATCSMon client opens a TCP connection to the published server IP address and listener port (usually 4800)
	// 	on the ATCSMon server, and waits for data arrival."
	var conn net.Conn
	var port string

	// connect to this socket
	var sockConnect = func() {
		fmt.Println("Attempting to connect...")
		conn,_ = net.Dial("tcp", url + ":4800")
		//CheckError(err)
		port, _ = bufio.NewReader(conn).ReadString('\n')
		//CheckError(err)
		println("Message from server (Port Number): "+port)
	}

	sockConnect()
	ticker = time.NewTicker(1 * time.Minute) //create a new ticker to go off every minute

	//If we were rejected, try again every minute.
	for port == "Rejected" {
		select {
		case <- ticker.C: // every tick,
			sockConnect()
		//CheckError(err)
		case <- quit: // if we cancel
			ticker.Stop()	//stop
			return
		}
	}

	//Close the TCP connection
	conn.Close()

	//Prepare for UDP traffic
	listenUDP := func() bool{
		fmt.Println("Attempting to listen to UDP..")
		serverAddr, err := net.ResolveUDPAddr("udp", url + ":" + port)
		CheckError(err)
		connect, err = net.DialUDP("udp", nil, serverAddr)
		if err != nil {
			fmt.Println("Error listening to UDP: , (Note this frequently happends due to the GBC server/routers)", err)
			return true
		}
		return false
	}

	rejected := listenUDP()

	for rejected {
		select {
		case <- ticker.C: // every tick,
			rejected = listenUDP()
		//CheckError(err)
		case <- quit: // if we cancel
			ticker.Stop()	//stop
			return
		}
	}

	//Start the connection to the UDP server
	//If we leave the local address nil, it will resolve itself.


	buf := []byte("Thanks")
	_, err := connect.Write(buf)
	CheckError(err)
	packets = make(chan string)
	quit = make(chan struct{}) //thread safe data channel
	go keepAlive() // keep the connection alive
	go listen() // listen for packets
	//return *c
}



