var RandBytes = new require('randbytes');

var randomSource = RandBytes.urandom.getInstance(); 
randomSource.getRandomBytes(1, function (buff) {
    var decimal = buff.readUIntBE(0, 1);
    var tmp = new Buffer(1);
    tmp[0] = 0xFF;
    console.log("+++++++" + tmp.readUIntBE(0, 1));
    console.log("-----" + decimal);
    console.log(buff, " bytes from /dev/urandom :) ");
});
/*
var buf = new Buffer(3);
 
buf[0] = 0x3;
buf[1] = 0x4;
buf[2] = 0x23;
 
for (ii = 0; ii < buf.length; ii++) {
  console.log(">>>>" + buf.readUInt8(ii));
}
 
*/
