package main

import (
	"TrainTrack/packetDecoding"
	"fmt"
)






// This was easy thanks to: http://atcswiki.greatlakesnetworking.net/bin/view/Main/NetworkConsiderations
func main() {
	str := packetDecoding.GetPacket()
	l2 := packetDecoding.GenLayer2(str)
	fmt.Println("L2: ", l2)
	//packetDecoding.Layer2(str)
	l3 := packetDecoding.GenLayer3(str)
	fmt.Println("L3: ", l3)


}
