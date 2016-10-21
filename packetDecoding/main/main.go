package main

import (
	"TrainTrack/packetDecoding"
)






// This was easy thanks to: http://atcswiki.greatlakesnetworking.net/bin/view/Main/NetworkConsiderations
func main() {
	str := packetDecoding.GetPacket()
	packetDecoding.GenLayer2(str)
	//packetDecoding.Layer2(str)


}
