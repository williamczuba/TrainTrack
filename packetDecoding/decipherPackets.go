package packetDecoding

import (
	"strconv"
)

type TrainInfo struct {
	destType int
}


func Layer2(hex string){
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