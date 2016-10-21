package packetDecoding

import (
	"encoding/hex"
	"fmt"
	"strconv"
)

const BLOCKBITS  = 60

//Struct to store the data from Layer2
type Layer2 struct {
	//Starting byte index of the layer from the hex dump
	start int
	//Ending byte index of the layer from the hex dump
	end int
	//size (# of HEX) of the layer
	size int
	//Destination type
	destType int
	// Number of 0's to pad out the fram
	padZeros int
	// Number of blocks (of 60 bits) per frame
	numBlocks int
	// CRC check for layer 2 (we don't use this...), store the hex w/o processing
	crc string
}

//Struct to store the data from Layer3
type Layer3 struct {
	//Starting byte index of the layer from the hex dump
	start int
	//Ending byte index of the layer from the hex dump
	end int
	//size (# of bytes) of the layer
	size int

	//header
	//vale of Q - should always be 0...
	Q int
	//value of D - conf packet required
	d bool
	// packet type
	packetType string
	// priority of the packet
	priority int
	//RF ack disabled or enabled
	rfAck bool
	// channel - should always be 0
	channel int
	// Tx or SSeq number
	tx int
	// RX or Rseq
	rx int
	// length of source address
	lenSrc int
	// length of the destination address
	lenDest int
	// destination address
	destAddr string
	// source address
	sourceAddr string
	// Fil3 and facility length (usually 0)
	fil3 int
	lenFacility int
}

//Struct to store the data from Layer4
type Layer4to7 struct {
	//Starting byte index of the layer from the hex dump
	start int
	//Ending byte index of the layer from the hex dump
	end int
	//size (# of bytes) of the layer
	size int
	// message number
	messNum int
	// more parts?
	more bool
	// part number
	partNum int
	// End to End ACK required?
	e2eAck int
	// number of parts of message
	numParts int
	// message vital?
	vital bool
	// message label
	label string
	// revision level (3 is current)
	revLvl int
	// number of bytes of data
	numBytes int
	//number of data bits in the last octet
	numLastBits int
	// Code line data as a string of bytes, for later processing.
	codeLineData string
	// CRC 16 check (we don't use this) store as a string of hex.
	crc string
}

//Struct to store all of the Layer information
type TrainInfo struct {
	hexDump string
	l2 Layer2
	l3 Layer3
	l4p Layer4to7
}

//Function to generate Layer2 information
func GenLayer2(hex string) Layer2{
	l2 := Layer2{}
	println("Hex Dump: ", hex)
	l2.start = 10

	//Destination Address
	//first 9 chars are just line numbers and spacing, so skip them.
	str := hex[10:12]
	dec := HexToDec(str)
	l2.destType = dec

	//1 spaces in between hex's

	// # 0's
	str = hex[13:15]
	dec = HexToDec(str)
	l2.padZeros = dec

	// # Blocks
	str = hex[16:18]
	dec = HexToDec(str)
	l2.numBlocks = dec

	// CRC
	l2.crc = hex[19:24]

	l2.end = 24
	l2.size = 10 // 10 bytes = 2 bytes + 2 + 2 + 4
	return l2
}


func GenLayer3(hex string) Layer3{
	l3 := Layer3{}
	println("Hex Dump: ", hex)

	//TODO start of layer 3 header (should be 64, or can it change?)
	str := hex[25:27]  // Maybe convert this to bit array, similar to how he does in his notes.
	bin := []byte(HexToBinary(str))
	println("Hex: ", str)
	println("Dec: ", string(bin))
	println("Length : ", len(bin))
	//Q is always 0 and is cut off from the string...
	l3.Q = 0
	//d
	// array indexing is backwards compared to bit[] indexing...
	if string(string(bin[0])) == "1" {
		l3.d = true
	} // false by default...
	//Type
	tip := string(bin[1:3])
	if  tip == "10" {
		l3.packetType = "Info"
	} else if tip == "00" {
		l3.packetType = "Nack"
	} else if tip == "11" {
		l3.packetType = "Ack"
	} else {
		fmt.Println("ERROR: Packet type = ", tip)
	}

	// priority
	pS := string(bin[3:6])
	l3p64, _ := strconv.ParseInt(pS, 2, 32)
	l3.priority = int(l3p64)
	//RF ack disabled?
	if string(bin[6]) == "0" {
		l3.rfAck = true // not disabled = enabled
	}


	str = hex[28:30]
	println("Hex: ", str)
	println("Dec: ", HexToDec(str))
	if str != "00" {
		fmt.Println("ERROR, channel should be 00!")
	}
	l3.channel = 0

	str = hex[31:33]
	println("Hex: ", str)
	println("Dec: ", HexToDec(str))
	bin = []byte(HexToBinary(str))

	return l3
}

func GenLayer4to7(hex string) Layer4to7{
	l4p := Layer4to7{}
	println("Hex Dump: ", hex)

	return l4p
}


/* Utilities */

// Converts a 2 digit hex to a stirng of the bits
func HexToBinary(s string) string{
	if len(s) != 2 {
		return ""
	}
//	Convert from hex to int
	dec, err := hex.DecodeString(s)
	if err != nil {
		panic(err)
	}

	bitArray := fmt.Sprintf("%b", dec[0])
	return bitArray
}

/*
Input: Only pass in strings of size 2 ( 1 Hex at a time!)
 */
func HexToDec(s string) int {
	if len(s) != 2 {
		return 0
	}
	//	Convert from hex to int
	dec, err := hex.DecodeString(s)
	if err != nil {
		panic(err)
	}

	return int(dec[0])

	//if len(hex) != 2 {
	//	return 0
	//}
	//fs := hex[:1]
	//f,err:=strconv.Atoi(fs)
	////print(f, err)
	//
	//var first int
	//if f <10 && err == nil {
	//	first = f
	//} else if fs == "a" {
	//	first = 10
	//} else if fs == "b" {
	//	first = 11
	//} else if fs == "c" {
	//	first = 12
	//} else if fs == "d" {
	//	first = 13
	//} else if fs == "e" {
	//	first = 14
	//} else if fs == "f" {
	//	first = 15
	//}
	//ss := hex[1:2]
	//s,err := strconv.Atoi(ss)
	//var second int
	//if s < 10&& err == nil {
	//	second = s
	//} else if ss == "a" {
	//	second = 10
	//} else if ss == "b" {
	//	second = 11
	//} else if ss == "c" {
	//	second = 12
	//} else if ss == "d" {
	//	second = 13
	//} else if ss == "e" {
	//	second = 14
	//} else if ss == "f" {
	//	second = 15
	//}
	//first *= 16
	//return first+second
}