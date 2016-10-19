package packetDecoding

import (
	"strconv"
)

//Struct to store all of the Layer information
type TrainInfo struct {
	hexDump string
	l2 Layer2
	l3 Layer3
	l4 Layer4
	l5 Layer5
	l6 Layer6
	l7 Layer7
}

//Struct to store the data from Layer2
type Layer2 struct {
	//Starting byte index of the layer from the hex dump
	start int
	//Ending byte index of the layer from the hex dump
	end int
	//size (# of bytes) of the layer
	size int
	//Destination type
	destType int
}

//Struct to store the data from Layer3
type Layer3 struct {
	//Starting byte index of the layer from the hex dump
	start int
	//Ending byte index of the layer from the hex dump
	end int
	//size (# of bytes) of the layer
	size int
}

//Struct to store the data from Layer4
type Layer4 struct {
	//Starting byte index of the layer from the hex dump
	start int
	//Ending byte index of the layer from the hex dump
	end int
	//size (# of bytes) of the layer
	size int
}

//Struct to store the data from Layer5
type Layer5 struct {
	//Starting byte index of the layer from the hex dump
	start int
	//Ending byte index of the layer from the hex dump
	end int
	//size (# of bytes) of the layer
	size int
}

//Struct to store the data from Layer6
type Layer6 struct {
	//Starting byte index of the layer from the hex dump
	start int
	//Ending byte index of the layer from the hex dump
	end int
	//size (# of bytes) of the layer
	size int
}

//Struct to store the data from Layer7
type Layer7 struct {
	//Starting byte index of the layer from the hex dump
	start int
	//Ending byte index of the layer from the hex dump
	end int
	//size (# of bytes) of the layer
	size int

}

//Function to generate Layer2 information
func (l2 Layer2) GenLayer2(hex string){
	println("Hex Dump: ", hex)

	//Destination Address
	//first 9 chars are just line numbers and spacing, so skip them.
	str := hex[10:12]
	println("Hex: ", str)
	println("Dec: ", HexToDec(str))

	//TODO Padding of the frame - how can we use this
	//1 spaces in between hex's
	str = hex[13:15]
	println("Hex: ", str)
	println("Dec: ", HexToDec(str))

	//TODO ???????????? - what is this?????
	//1 spaces in between hex's
	str = hex[16:18]
	println("Hex: ", str)
	println("Dec: ", HexToDec(str))

	//CRC stuff.
	//1 spaces in between hex's
	str = hex[19:21]
	println("Hex: ", str)
	println("Dec: ", HexToDec(str))

	//1 spaces in between hex's
	str = hex[22:24]
	println("Hex: ", str)
	println("Dec: ", HexToDec(str))
}


func Layer3(hex string) {
	println("Hex Dump: ", hex)

	//TODO start of layer 3 header (should be 64, or can it change?)
	str := hex[25:27]  // Maybe convert this to bit array, similar to how he does in his notes.
	println("Hex: ", str)
	println("Dec: ", HexToDec(str))

	str = hex[28:30]
	println("Hex: ", str)
	println("Dec: ", HexToDec(str))

}

/* Utilities */

/*
Input: Only pass in strings of size 2 ( 1 Hex at a time!)
 */
func HexToDec(hex string) int {
	if len(hex) != 2 {
		return 0
	}
	fs := hex[:1]
	f,err:=strconv.Atoi(fs)
	//print(f, err)

	var first int
	if f <10 && err == nil {
		first = f
	} else if fs == "a" {
		first = 10
	} else if fs == "b" {
		first = 11
	} else if fs == "c" {
		first = 12
	} else if fs == "d" {
		first = 13
	} else if fs == "e" {
		first = 14
	} else if fs == "f" {
		first = 15
	}
	ss := hex[1:2]
	s,err := strconv.Atoi(ss)
	var second int
	if s < 10&& err == nil {
		second = s
	} else if ss == "a" {
		second = 10
	} else if ss == "b" {
		second = 11
	} else if ss == "c" {
		second = 12
	} else if ss == "d" {
		second = 13
	} else if ss == "e" {
		second = 14
	} else if ss == "f" {
		second = 15
	}
	first *= 16
	return first+second
}