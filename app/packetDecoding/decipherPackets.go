// Will decipher the hex packet.
package packetDecoding

import (
	"encoding/hex"
	"fmt"
	"strconv"
	"strings"
	"errors"
)

//Struct of shared layer info (indices of layer start and end, and its size)
type LayerInfo struct {
	Start int 	`json:"Start"`
	End int 	`json:"End"`
	Size int	`json:"Size"`
}

//Struct to store the data from Layer2
type Layer2 struct {
	Info      *LayerInfo	`json:Info`
	//Destination type
	DestType  int	`json:"DestType"`
	// Number of 0's to pad out the frame
	PadZeros  int	`json:"PadZeros"`
	// Number of blocks (of 60 bits) per frame
	NumBlocks int	`json:"NumBlocks"`
	// CRC check for layer 2 (we don't use this...), store the hex w/o processing
	Crc       string	`json:"Crc"`
}


//Struct to store the data from Layer3
type Layer3 struct {
	Info       *LayerInfo	`json:Info`
	//header
	//vale of Q - should always be 0...
	Q             int	`json:"Q"`
	//value of D - conf packet required
	D             bool	`json:"D"`
	// packet type
	PacketType    string	`json:"PacketType"`
	// priority of the packet
	Priority      int	`json:"Priority"`
	//RF ack disabled or enabled
	RfAck         bool	`json:"RfAck"`
	// channel - should always be 0
	Channel       int `json:"Channel"`
	// Tx or SSeq number
	Tx            int	`json:"Tx"`
	// RX or Rseq
	Rx            int	`json:"Rx"`
	// length of source address
	LenSrc        int	`json:"LenSrc"`
	// length of the destination address
	LenDest       int	`json:"LenDest"`
	// destination address
	DestAddr      string	`json:"DestAddr"`
	// source address
	SourceAddr    string	`json:"SourceAddr"`
	// Fil3 and facility length (usually 0)
	Fil3          int	`json:"Fil3"`
	LenFacility   int	`json:"LenFacility"`

	//end index of the layer
	LayerEndIndex int	`json:"LayerEndIndex"`
}

//Struct to store the data from Layer4
type Layer4to7 struct {
	Info         *LayerInfo	`json:Info`
	// message number
	MessNum      int	`json:MessNum`
	// more parts?
	More         bool	`json:More`
	// part number
	PartNum      int	`json:PartNum`
	// End to End ACK required?
	E2eAck       bool	`json:E2EAck`
	// number of parts of message
	NumParts     int	`json:NumParts`
	// message vital?
	Vital        bool	`json:Vital`
	// message label
	Label        string	`json:Label`
	// revision level (3 is current)
	RevLvl       int	`json:RevLvl`
	// number of bytes of data
	NumBytes     int	`json:NumBytes`
	//number of data bits in the last octet
	NumLastBits  int	`json:NumLastBits`
	// Code line data as a string of bytes, for later processing.
	CodeLineData string	`json:CodeLineData`
	// CRC 16 check (we don't use this) store as a string of hex.
	Crc          string	`json:Crc`
}

//Struct to store all of the Layer information
type TrainInfo struct {
	//hexDump string
	L2  Layer2
	L3  Layer3
	L4P Layer4to7
}

// Creates a new TrainInfo instance given a hex string.
func NewTrainInfo(hex string) *TrainInfo {
	t := new(TrainInfo)
	t.L2 = GenLayer2(hex)
	var err error
	t.L3, err = GenLayer3(hex, t.L2.Info.End)
	if err != nil { // Then stop
		return nil
	}
	t.L4P = GenLayer4to7(hex, t.L3.LayerEndIndex)
	return t
}

// To string method for Train Info
func (t *TrainInfo) String() string {
	return fmt.Sprintf("Layer2: %v | Layer3: %v | Layer4to7: %v\n", t.L2, t.L3, t.L4P)
}

//Function to generate Layer2 information
// size is always 10 bytes!
func  GenLayer2(hex string) Layer2{
	l2 := Layer2{}
	info := new(LayerInfo)
	info.Start = 0

	//Destination Address
	//first 9 chars are just line numbers and spacing, so skip them.
	str := hex[0:2]
	dec := HexToDec(str)
	l2.DestType = dec

	// # 0's
	str = hex[2:4]
	dec = HexToDec(str)
	l2.PadZeros = dec

	// # Blocks
	str = hex[4:6]
	dec = HexToDec(str)
	l2.NumBlocks = dec

	// CRC
	l2.Crc = hex[6:10]

	info.End = 10
	info.Size = 10 // 10 bytes = 2 bytes + 2 + 2 + 4
	l2.Info = info
	return l2
}

//Function to generate Layer3 information.
// Will return an error if there are any issues with the packet/deciphering (which happens a lot, since packets are frequently damaged, have a different label than the 2 we defined, among other things)
func  GenLayer3(hex string, start int) (Layer3, error){
	l3 := Layer3{}
	info := new(LayerInfo)
	info.Start = start
	i := start
	e := start+2
	str := hex[i:e]
	bin := []byte(HexToBinary(str))
	//Q is always 0 and is cut off from the string...
	l3.Q = 0
	//d
	// array indexing is backwards compared to bit[] indexing...
	if string(string(bin[0])) == "1" {
		l3.D = true
	} // false by default...
	//Type
	tip := string(bin[1:3])
	if  tip == "10" {
		l3.PacketType = "Info"
	} else if tip == "00" {
		l3.PacketType = "Nack"
	} else if tip == "11" {
		l3.PacketType = "Ack"
	} else {
		e := fmt.Sprintln("ERROR: Packet type = ", tip)
		return l3, errors.New(e)
	}

	// priority
	pS := string(bin[3:6])
	l3p64, _ := strconv.ParseInt(pS, 2, 32)
	l3.Priority = int(l3p64)
	//RF ack disabled?
	if string(bin[6]) == "0" {
		l3.RfAck = true // not disabled = enabled
	}

	// Channel - should be constant 00
	i = e
	e = i+2
	str = hex[i:e]
	if str != "00" {
		e := fmt.Sprintln("ERROR, channel should be 00!")
		return l3, errors.New(e)
	}
	l3.Channel = 0

	// TX or SSeq Number
	i = e
	e = i+2
	str = hex[i:e]
	bin = []byte(HexToBinary(str))
	//last bit is always 0, only use the first 7 bits for number
	if len(bin) == 8 { //go cuts out any leading 0's, so we need to check the size
		l3p64, _ = strconv.ParseInt(string(bin[:7]), 2, 32)
	} else {
		l3p64, _ = strconv.ParseInt(string(bin), 2, 32)
	}
	l3.Tx = int(l3p64)

	//RX or Rseq number
	i = e
	e = i+2
	str = hex[i:e]
	bin = []byte(HexToBinary(str))
	//last bit is always 0, only use the first 7 bits for number
	if len(bin) == 8 { //go cuts out any leading 0's, so we need to check the size
		l3p64, _ = strconv.ParseInt(string(bin[:7]), 2, 32)
	} else {
		l3p64, _ = strconv.ParseInt(string(bin), 2, 32)
	}
	l3.Rx = int(l3p64)

	// length of source and destination
	i = e
	e = i+2
	str = hex[i:e]
	dec := HexToDec(string(str[0]))
	l3.LenSrc = dec // nibbles = 4 bits * the decimal number
	dec = HexToDec(string(str[1]))
	l3.LenDest = dec // nibbles = 4 bits * the decimal number

	replace := func(str string) string{
		str = strings.Replace(str, " ", "", -1)
		str = strings.Replace(str, "a", "0", -1)
		str = strings.Replace(str, "b", "1", -1)
		str = strings.Replace(str, "c", "2", -1)
		str = strings.Replace(str, "d", "3", -1)
		str = strings.Replace(str, "e", "4", -1)
		str = strings.Replace(str, "f", "5", -1)
		return str
	}

	// destination address
	i = e
	e = i+l3.LenDest
	str = hex[i:e]
	str = replace(str)
	l3.DestAddr = str

	//Source address
	i = e
	e = i+l3.LenSrc
	str = hex[i:e]
	str = replace(str)
	l3.SourceAddr = str

	//Fil3
	i = e
	e = i+1
	str = hex[i:e]
	l3.Fil3 = HexToDec(str)

	i = e
	e = i+1
	str = hex[i:e]
	l3.LayerEndIndex = e
	l3.LenFacility = HexToDec(str)
	if str != "0" {
		e := fmt.Sprintln("ERROR WITH FACILITY LEN")
		return l3, errors.New(e)
	}
	info.End = e
	info.Size = info.End - info.Start
	l3.Info = info

	return l3, nil
}

// Generate the layers 4 to 7.
func GenLayer4to7(hex string, start int) Layer4to7{
	l4p := Layer4to7{}
	info := new(LayerInfo)
	info.Start = start
	//l4p.start = start
	currIndex:=start
	endIndex:=start+2
	//Make the first slice -- Message number and whether or not there are more parts
	str := hex[currIndex:endIndex]
	//convert those digits into binary string
	binary := HexToBinary(str)
	//slice the resulting binary string into the message number and more parts section
	msgNumBinStr := binary[0:7]
	morePartsBinStr := binary[7:]
	//check whether more parts binary bit is true or false and set it
	if morePartsBinStr == "1"{
		l4p.More = true
	}else {
		l4p.More = false
	}
	//Convert the message number from binary string to decimal int
	msgNumDecInt, err := strconv.ParseInt(msgNumBinStr, 2, 16)
	if err != nil{
		panic(err)
	}
	//set the message number value and print both values
	l4p.MessNum = int(msgNumDecInt)

	currIndex=endIndex
	endIndex = currIndex+2
	//make second slice -- Part number and END-TO-END ACK
	str = hex[currIndex:endIndex]
	binary = HexToBinary(str)
	//slice the resulting binary string into the part number and END-TO-END ACK
	partNumBinStr := binary[0:7]
	e2eAckBinStr := binary[7:]
	//Check whether the END-TO-END ACK bit is true or false and set it
	if e2eAckBinStr == "1"{
		l4p.E2eAck = true
	}else {
		l4p.E2eAck = false
	}
	//Convert the part number from binary string to decimal int
	partNumDecInt, err := strconv.ParseInt(partNumBinStr, 2, 16)
	if err != nil{
		panic(err)
	}
	//Set the part number and print both values
	l4p.PartNum = int(partNumDecInt)

	currIndex=endIndex
	endIndex = currIndex+2
	//make third slice -- Number of parts and message vitality
	str = hex[currIndex:endIndex]
	binary = HexToBinary(str)
	//slice the resulting binary string into the number of parts and whether or not it is vitaL
	numPartsBinStr := binary[0:7]
	vitalBinStr := binary[7:]
	//Check the last bit to see if message is vital and set it
	if vitalBinStr == "1"{
		l4p.Vital = true
	}else {
		l4p.Vital = false
	}
	//Convert the number of parts from binary string to decimal int
	numPartsDecInt, err := strconv.ParseInt(numPartsBinStr, 2, 16)
	if err != nil{
		panic(err)
	}
	//Set the number of parts and print both values
	l4p.NumParts = int(numPartsDecInt)

	// label: int 64 of 4 hex.
	currIndex=endIndex
	endIndex = currIndex+4
	str = string(hex[currIndex:endIndex])
	i64, err := strconv.ParseInt(str, 16, 32)
	label64 := "9."
	i32 := int(i64) - 9*512
	t := i32/64
	label64 += strconv.Itoa(t) + "."
	t = i32 % 64
	label64 += strconv.Itoa(t)
	l4p.Label = label64

	currIndex=endIndex
	endIndex = currIndex+2
	//make fifth slice -- rev level
	str = hex[currIndex:endIndex]
	l4p.RevLvl = HexToDec(str)

	//Bits 58 and 59 are skipped
	//NOTE: We skip 2 zero's here!
	currIndex=endIndex +2
	endIndex = currIndex+2

	//make sixth slice -- number of octets in the data
	str = hex[currIndex:endIndex]
	l4p.NumBytes = HexToDec(str)

	currIndex=endIndex
	endIndex = currIndex+2
	//make seventh slice -- number of data bits in the last octet
	str = hex[currIndex:endIndex]
	l4p.NumLastBits = HexToDec(str)

	currIndex=endIndex
	endIndex = currIndex+l4p.NumBytes *2 // 2 octets per hex

	//make sixth slice -- number of octets in the data
	str = hex[currIndex:endIndex]
	//set the value and print it
	l4p.CodeLineData = str

	//make the last slice -- CRC 16 check. Just need to store string version of the hex
	currIndex=endIndex
	endIndex = currIndex+4
	//make seventh slice -- number of data bits in the last octet
	str = hex[currIndex:endIndex]

	l4p.Crc = str
	info.End = endIndex

	l4p.Info = info
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
	//fmt.Println("bit array: ", bitArray)
	//fmt.Println("bit array: ", bits)
	if len(bitArray) < 8 {
		//fmt.Println("Length: ",len(bitArray))
		x:=8-len(bitArray)
		for i := 0; i < x; i++ {
			bitArray = "0" + bitArray
		}

	}
	//fmt.Println("bit array after: ", bitArray)
	//fmt.Println()
	return bitArray
}

/*
Input: Only pass in strings of size 2 ( 1 Hex at a time!)
 */
func HexToDec(s string) int {
	if len(s) == 1 {
		s = "0" + s
	}
	//	Convert from hex to int
	dec, err := hex.DecodeString(s)
	if err != nil {
		panic(err)
	}

	return int(dec[0])

}
