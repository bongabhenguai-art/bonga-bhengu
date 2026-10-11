import QRCode from 'qrcode';
export const renderQRCode=(canvas,url)=>QRCode.toCanvas(canvas,url,{width:256,margin:4,errorCorrectionLevel:'M',color:{dark:'#000000',light:'#ffffff'}});
