package main

import (

	"time"
	"net"
	"bufio"
	//"os"
	"fmt"
	"os"
)


func CheckError (e error) {
	if e != nil {
		panic(e)
	}
}
var Connect  net.Conn
func main() {
	//doEvery(20*time.Millisecond, helloworld)

	url := "NS-HbgDiv.dyndns.org"
	//1. The ATCSMon client opens a TCP connection to the published server IP address and listener port (usually 4800) on the ATCSMon server, and waits for data arrival.
	// connect to this socket
	conn, err := net.Dial("tcp", url + ":4800")
	CheckError(err)
	port, err := bufio.NewReader(conn).ReadString('\n')
	fmt.Print("Message from server (Port Number): "+port)

	//Make sure we didn't fail before proceding
	if port == "Rejected" {
		println("Error: we got rejected... We should change this to try again in 1 minute.")
		os.Exit(0)
	}

	//2. The ATCSMon server accepts the connection request, sends the port number it has established for the data connection, closes the TCP connection, and restarts the listener.
	//3. The client receives the port number, closes the TCP connection to the server listener port, and prepares for UDP traffic to and from the supplied port number.
	// 	If there are no available UDP ports (all connections configured in Base=xxxxx,yy) or if your client is in the list of denied connections on the server,
	// 	the word "Rejected" is sent to the client, and the client silently fails to connect.

	//Close the TCP connection
	conn.Close()

	//Prepare for UDP traffic
	serverAddr,err := net.ResolveUDPAddr("udp", url + ":" + port)
	CheckError(err)

	//If we leave the local address nil, it will resolve itself.
	//localAddr, err := net.ResolveUDPAddr("udp", "127.0.0.1:0")
	//CheckError(err)

	Connect, err = net.DialUDP("udp", nil, serverAddr)
	CheckError(err)

	//Defer is awesome in go... now we don't need to worry about closing the connection
	defer Connect.Close()



	//4. Immediately after the TCP connection is closed, and every 2 minutes or less thereafter, the client sends the ATCS Monitor version number as a string like “3.5.2” (or "Thanks" in older versions) to the server on the assigned port via UDP. Otherwise, the server will assume the client has disappeared, and will cease sending traffic. The initial transmission is solely used to create an inbound path through a firewall for the forthcoming UDP, as many firewalls refuse to accept inbound UDP unless outbound UDP to the port is seen first.
	//We will say "Thanks" in response, since we aren't ATCS
	buf := []byte("Thanks")
	_,err = Connect.Write(buf)

	//This is how we design a concurrent function that runs every minute  (so as not to stop the flow of the program...)
	//	Thanks to http://stackoverflow.com/questions/16466320/is-there-a-way-to-do-repetitive-tasks-at-intervals-in-golang for this piece of code.
	//	  I genuinely never heard of ticker, but its really cool.
	ticker := time.NewTicker(1 * time.Minute)
	quit := make(chan struct{})
	go func() {
		for {
			select {
			case <- ticker.C:
				buf := []byte("Thanks")
				_,err := Connect.Write(buf)
				CheckError(err)
			case <- quit:
				ticker.Stop()
				return
			}
		}
	}()
	//You can stop the worker by closing the quit channel: close(quit).
	defer close(quit)
	//TODO 5. Every 2 minutes, if no traffic has been sent by the server, it sends the message "*KEEPALIVE" instead.
	// 	This permits the client to assume the server has disappeared if nothing has been received for
	// 	over 2 minutes, and then gracefully conclude the session.
	println("Hey there.")
	//6. The client sends the string "DISCONNECT" before terminating to keep the server happiest.
	dis := []byte( "DISCONNECT")
	defer Connect.Write(dis)
	p :=  make([]byte, 2048)
	_, err = bufio.NewReader(Connect).Read(p)
	if err == nil {
		fmt.Printf("Packet: %s\n", p)
	} else {
		fmt.Printf("Some error %v\n", err)
	}

}