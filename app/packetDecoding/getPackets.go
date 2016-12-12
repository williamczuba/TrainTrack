//Will connect to the harrisburg server, and serve deciphered packet
package packetDecoding

import (

	"net"
	"time"
	"bufio"
	"encoding/hex"
	//"fmt"
	"fmt"
	"sync/atomic"
)

//Check for an error, and panic if necessary
func CheckError (e error) {
	if e != nil {
		panic(e)
	}
}

var (
	// Store the network connection
	connect net.Conn
	// Channel to quit - exit gracefully from the connections
	quit    chan struct{}
	// Concurrent timer
	ticker  *time.Ticker
	// Channel to store packets as they're found
	packets chan string
	// stores the amount of time the program has been idle (so we can stop the connection when the program isn't in use, and then restart it when in use)
	lull uint64
)

//Should be called on program exit to execute the connection gracefully.
func Stop() {
	select {
	case <-quit: // If quit was closed, then don't close it...
	default:
		close(quit)
		dis := []byte( "DISCONNECT")
		connect.Write(dis)
		connect.Close()
	}
}

//TODO "5. Every 2 minutes, if no traffic has been sent by the server, it sends the message "*KEEPALIVE" instead.
//	// 	This permits the client to assume the server has disappeared if nothing has been received for
//	// 	over 2 minutes, and then gracefully conclude the session."


// Get the latest and greatest Train Information.
// Will wait for the server to get a packet, before returning that packet.
func GetTrainInfo() *TrainInfo{
	atomic.StoreUint64(&lull, uint64(0)) // reset the lull (since its active)
	select {
	case <-quit: // if we quit, we need to restart the connection
		InitConnection()
	default: // Otherwise, don't block.
	}
	for {
		select {
		case data := <- packets:
			return NewTrainInfo(data)
		}
	}
}

// Function to keep the connection alive.
func keepAlive() {
	for {
		select {
		case <- quit: // if we cancel
			ticker.Stop()	//stop
			return
		case <- ticker.C: // every tick,
			buf := []byte("Thanks")
			_,err := connect.Write(buf) //send a thanks message
			CheckError(err)
			atomic.AddUint64(&lull, 1) // another 1 minutes passed
			if atomic.LoadUint64(&lull) >= uint64(15){ // If 15 minutes passed without use
				// Stop the connection.  We can recreate it later.
				Stop()
			}
		}
	}
}

// Listen for packets from the harrisburg server, decipher them, and send them to the front end.
// If the server rejects the connection (which happens a lot) then reset the connection.
func listen() {
	for {
		select {
		case <-quit:
		// if we cancel
			ticker.Stop()        //stop
			return
		default:
			data := bufio.NewReader(connect)
		// Assume the message is giant - 8 Blocks of 60 bit frames
			p := make([]byte, 60)
			_, err := data.Read(p)
			//CheckError(err)
			if err != nil {
				fmt.Println("Error in getpackets listen():", err)
				// reset the connection...
				Stop()
				InitConnection()
				return
			} else {
				str := hex.EncodeToString(p)
				packets <- str//hex.Dump(p)
			}

		}

	}
}

//Initialize the connection
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
			fmt.Println("Error listening to UDP: , (Note this frequently happens due to the GBC server/routers)", err)
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



