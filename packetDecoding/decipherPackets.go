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
	e2eAck bool
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

	// Channel - should be constant 00
	str = hex[28:30]
	println("Hex: ", str)
	println("Dec: ", HexToDec(str))
	if str != "00" {
		fmt.Println("ERROR, channel should be 00!")
	}
	l3.channel = 0

	// TX or SSeq Number
	str = hex[31:33]
	//println("Hex: ", str)
	//println("Dec: ", HexToDec(str))
	bin = []byte(HexToBinary(str))
	//last bit is always 0, only use the first 7 bits for number
	if len(bin) == 8 { //go cuts out any leading 0's, so we need to check the size
		l3p64, _ = strconv.ParseInt(string(bin[:7]), 2, 32)
	} else {
		l3p64, _ = strconv.ParseInt(string(bin), 2, 32)
	}
	l3.tx = int(l3p64)
	println(hex[31:])
	//RX or Rseq number
	str = hex[35:37]
	println(str)
	bin = []byte(HexToBinary(str))
	//last bit is always 0, only use the first 7 bits for number
	if len(bin) == 8 { //go cuts out any leading 0's, so we need to check the size
		l3p64, _ = strconv.ParseInt(string(bin[:7]), 2, 32)
	} else {
		l3p64, _ = strconv.ParseInt(string(bin), 2, 32)
	}
	l3.rx = int(l3p64)

	// length of soruce and destination
	str = hex[38:40]
	dec := HexToDec(string(str[0]))
	l3.lenSrc = dec // nibbles = 4 bits * the decimal number
	dec = HexToDec(string(str[1]))
	l3.lenDest = dec // nibbles = 4 bits * the decimal number

	// destination address
	dEnd := 41+l3.lenDest+((l3.lenDest/2)-1) // must account for spaces.
	fmt.Printf("DEND: %d, len Dest: %d \n", dEnd, l3.lenDest)
	str = hex[41:dEnd]
	l3.sourceAddr = str
	sStart := (dEnd + 1)
	sEnd := sStart + l3.lenSrc + ((l3.lenSrc/2)-1)
	str = hex[sStart:sEnd]
	l3.destAddr = str

	// Fil3
	str = hex[sEnd + 1: sEnd+3]
	fmt.Println("FIL3:", str)
	l3.fil3 = HexToDec(str)
	return l3
}

func GenLayer4to7(hex string) Layer4to7{
	l4p := Layer4to7{}
	println("Hex Dump: ", hex)

	//Declare the variables we know already
	l4p.start = 46// 46 - notice that 46 was only for the example, in reality, we want to pick up from the end of layer 3.
	l4p.end = 81
	l4p.size = 36

	//Make the first slice -- Message number and whether or not there are more parts
	str := hex[46:48]
	fmt.Println("Hex1: ", str)
	//convert those digits into binary string
	binary := HexToBinary(str)
	//slice the resulting binary string into the message number and more parts section
	msgNumBinStr := binary[0:7]
	morePartsBinStr := binary[7:]
	//check whether more parts binary bit is true or false and set it
	if morePartsBinStr == "1"{
		l4p.more = true
	}else {
		l4p.more = false
	}
	//Convert the message number from binary string to decimal int
	msgNumDecInt, err := strconv.ParseInt(msgNumBinStr, 2, 16)
	if err != nil{
		panic(err)
	}
	//set the message number value and print both values
	l4p.messNum = int(msgNumDecInt)
	fmt.Println("Message num: ", msgNumDecInt)
	fmt.Println("More parts: ", morePartsBinStr)


	//make second slice -- Part number and END-TO-END ACK
	str = hex[48:50]
	fmt.Println("Hex2: ", str)
	binary = HexToBinary(str)
	//slice the resulting binary string into the part number and END-TO-END ACK
	partNumBinStr := binary[0:7]
	e2eAckBinStr := binary[7:]
	//Check whether the END-TO-END ACK bit is true or false and set it
	if e2eAckBinStr == "1"{
		l4p.e2eAck = true
	}else {
		l4p.e2eAck = false
	}
	//Convert the part number from binary string to decimal int
	partNumDecInt, err := strconv.ParseInt(partNumBinStr, 2, 16)
	if err != nil{
		panic(err)
	}
	//Set the part number and print both values
	l4p.partNum = int(partNumDecInt)
	fmt.Println("Part number: ", partNumDecInt)
	fmt.Println("Ack e2e: ", e2eAckBinStr)


	//make third slice -- Number of parts and message vitality
	str = hex [50:52]
	fmt.Println("Hex3: ", str)
	binary = HexToBinary(str)
	//slice the resulting binary string into the number of parts and whether or not it is vitaL
	numPartsBinStr := binary[0:7]
	vitalBinStr := binary[7:]
	//Check the last bit to see if message is vital and set it
	if vitalBinStr == "1"{
		l4p.vital = true
	}else {
		l4p.vital = false
	}
	//Convert the number of parts from binary string to decimal int
	numPartsDecInt, err := strconv.ParseInt(numPartsBinStr, 2, 16)
	if err != nil{
		panic(err)
	}
	//Set the number of parts and print both values
	l4p.numParts = int(numPartsDecInt)
	fmt.Println("Num parts: ", numPartsDecInt)
	fmt.Println("Vital: ", vitalBinStr)


	//make fourth slice -- Label
	//First convert the hex to decimal, then follow this formula:
	//Divide the decimal by 512 to get the first part of the label
	//Divide the remainder of the first divison by 64 to get the second part
	//Take whatever remainder is left (this is the third part) i.e. 128B = 4747, 4747 = 9 * 512 + 2 * 64 + 11(remainder from those operations), so the label is: "9.2.11"
	str = hex[52:56]
	fmt.Println("Hex4: ", str)
	//convert from hex to decimal
	labelDecInt, err := strconv.ParseInt(str, 16, 16)
	if err != nil{
		panic(err)
	}
	//Divide the decimal by 512 and save the remainder
	labelPt1 := labelDecInt / 512
	firstRem := labelDecInt % 512
	//Divide the remainder by 64 and save the remainder
	labelPt2 := firstRem / 64
	finalRem:= firstRem % 64
	//Format the label
	label := fmt.Sprintf("%d.%d.%d", labelPt1, labelPt2, finalRem)
	//Print and set the value
	l4p.label = label
	fmt.Println("Label: ", label)


	//make fifth slice -- rev level
	str = hex[56:58]
	fmt.Println("Hex5: ", str)
	revLvl := HexToDec(str)
	//set the value and print it
	l4p.revLvl = revLvl
	fmt.Println("revLvl: ", revLvl)

	//Bits 58 and 59 are skipped

	//make sixth slice -- number of octets in the data
	str = hex[60:62]
	fmt.Println("Hex6: ", str)
	numOctets := HexToDec(str)
	//set the value and print it
	l4p.numBytes = numOctets
	fmt.Println("numBytes: ", numOctets)


	//make seventh slice -- number of data bits in the last octet
	str = hex[62:64]
	fmt.Println("Hex7: ", str)
	numLastBits := HexToDec(str)
	//set the value and print it
	l4p.numLastBits = numLastBits
	fmt.Println("numLastBytes: ", numLastBits)


	//make the eighth slice -- code line data
	str = hex[64:78]
	fmt.Println("Hex8: ", str)
	//convert from hex to binary
	codeLine := HexToBinary(str)
	//set the value and print it
	l4p.codeLineData = codeLine
	fmt.Println("codeLine: ", codeLine)


	//make the last slice -- CRC 16 check. Just need to store string version of the hex
	str = hex[78:82]
	fmt.Println("Hex9: ", str)
	//set and print the value
	l4p.crc = str
	fmt.Println("crc: ", str)

	return l4p
}

/* Utilities */

// Converts a 2 digit hex to a string of the bits
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