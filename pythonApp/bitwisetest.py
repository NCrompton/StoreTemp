import struct

def binary(i):
    if(type(i) == str):
        return bin(ord(i))
    elif (type(i) in [int, float] and i > 0):
        return bin(i)
    elif (type(i) in [int, float]):
        return bin(((1 << 8) - 1) & i)



def bin_disloc():
    x = 27
    print(~x)
    _x2 = x >> 2
    _2x = x << 2
    _2x >>= 1
    print(binary(x))
    print(binary(_x2))
    print(binary(_2x))
    print(binary('?'))
    print(binary(-12))
    bi = 0x23
    print(binary(bi))
    print(f"the binary and is {-0x1 & 0x24}")
    print(True & True)

def binary_float(num):
    # Struct can provide us with the float packed into bytes. The '!' ensures that
    # it's in network byte order (big-endian) and the 'f' says that it should be
    # packed as a float. Alternatively, for double-precision, you could use 'd'.
    packed = struct.pack('!f', num)
    print('Packed: %s' % repr(packed))

    # For each character in the returned string, we'll turn it into its corresponding
    # integer code point
    # 
    # [62, 163, 215, 10] = [ord(c) for c in '>\xa3\xd7\n']
    integers = [ord(c) for c in packed]
    print ('Integers: %s' % integers)

    # For each integer, we'll convert it to its binary representation.
    binaries = [bin(i) for i in integers]
    print ('Binaries: %s' % binaries
)
    # Now strip off the '0b' from each of these
    stripped_binaries = [s.replace('0b', '') for s in binaries]
    print ('Stripped: %s' % stripped_binaries)

    # Pad each byte's binary representation's with 0's to make sure it has all 8 bits:
    #
    # ['00111110', '10100011', '11010111', '00001010']
    padded = [s.rjust(8, '0') for s in stripped_binaries]
    print ('Padded: %s' % padded)

    # At this point, we have each of the bytes for the network byte ordered float
    # in an array as binary strings. Now we just concatenate them to get the total
    # representation of the float:
    return ''.join(padded)

def bin_xor():
    for i in range(20):
        print(binary(0-i))

    print(bin(0b11011 ^ 0b01001))
    p_k = 243
    pr_k = 332
    secret = ((1 >> 10)- 1) & (p_k) ^ ((1 >> 10)- 1) & (pr_k)
    print(f"public key is {bin(p_k)} and private key is {bin(pr_k)} and the secret is {bin(secret)}")

bin_xor()
#binary_float(12.3)