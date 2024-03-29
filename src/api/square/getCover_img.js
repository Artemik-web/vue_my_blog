import service from '@/untils/service'
export const getCover_img = async (data) => {
    if(data.length == 0) return
    for (let i = 0; i < data.length; i++) {
        // console.log(`http://localhost:3007${data[i].cover_img.replaceAll('\\', '/')}`)
       await service({
            // url: `https://47.115.214.138/api${data[i].cover_img.replaceAll('\\', '/')}`,
            url: `http://localhost:3007${data[i].cover_img.replaceAll('\\', '/')}`,
            method: 'get',
            //设置类型才能返回blob对象
            responseType: 'blob'
            // header: `PB_token:${token}`
        }).then(res=>{
            
            data[i].cover_img = URL.createObjectURL(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }
    return data
}