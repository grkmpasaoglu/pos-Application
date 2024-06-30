import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Carousel, Checkbox, Form, Input, message } from 'antd'
import AuthCarousel from '../../components/auth/AuthCarousel'

const LoginPage = () => {

    const navigate = useNavigate();
    const [loading,setLoading] = useState(false)

    const onFinish = async (values) => {
        setLoading(true)
        try {
          const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/auth/login", {
            method: "POST",
            body: JSON.stringify(values),
            headers: { "Content-type": "application/json; charset=UTF-8" }
          })


          const user = await res.json();
          localStorage.setItem("posUser", JSON.stringify({
            username:user.username,
            email : user.eMail,
          }))

          if (res.status === 200) {
            message.success("Giriş başarılı.") 
            navigate("/")
          }else if(res.status === 404) {
            message.error("Kullanıcı bulunamadı")
          }else if(res.status === 403) {
            message.error("Şifre yanlış")
          }
          setLoading(false)

        } catch (error) {
          console.log(error)
          message.danger("Bir şeyler yanlış gitti.")
        }
      }

    return (
        <div className="h-screen ">
            <div className="flex justify-between h-full">
                <div className="w-full xl:w-4/12 flex justify-center items-center">
                    <div className="bg-white">
                        <div className="h-34rem py-12 w-96 kapsayici bg-beyazi justify-center items-center text-center flex flex-col gap-6 rounded-2xl shadow-2xl shadow-gray-500 ">
                            <img
                                src="images/logoRegister.jpeg"
                                alt="LOGO"
                                className="h-24 w-24 rounded-full p-2"
                            />
                            <p>Get Premium'a Giriş Yapın.</p>
                            <Form onFinish={onFinish}>
                                <Form.Item
                                    className="w-80"
                                    name={'eMail'}
                                    rules={[
                                        { required: true, message: 'Bu alan boş bırakılamaz.' },
                                    ]}
                                >
                                    <Input placeholder="E-Posta" />
                                </Form.Item>
                                <Form.Item
                                    className="w-80"
                                    name={'password'}
                                    rules={[
                                        { required: true, message: 'Bu alan boş bırakılamaz.' },
                                    ]}
                                >
                                    <Input.Password placeholder="Şifre" />
                                </Form.Item>
                                <Form.Item name={"remember"} valuePropName='checked'>
                                    <div className='flex justify-between'>
                                        <Checkbox>
                                            Beni Hatırla
                                        </Checkbox>
                                        <Link>
                                            Şifremi Unuttum
                                        </Link>
                                    </div>
                                </Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="w-full"
                                    size="large"
                                    loading={loading}
                                >
                                    Giriş Yap
                                </Button>
                            </Form>
                        </div>
                        <div className="text-center mt-12">
                            Bir hesabınız yok mu ?{' '}
                            <Link to="/register" className="text-blue-500">
                                Şimdi kayıt olun.
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#6c63ff] h-full">
                    <div className="w-full h-full flex items-center">
                        <div className="w-full">
                            <Carousel autoplay="true" className="!h-full px-6">
                                <AuthCarousel
                                    img="/images/responsive.svg"
                                    title="Responsive"
                                    desc="Tüm Cihaz Boyutlarıyla Uyumluluk"
                                />
                                <AuthCarousel
                                    img="/images/statistic.svg"
                                    title="İstatistikler"
                                    desc="Geniş Tutulan İstatistikler"
                                />
                                <AuthCarousel
                                    img="/images/customer.svg"
                                    title="Müşteri Memnuniyeti"
                                    desc="Deneyim Sonunda Üründen Memnun Müşteriler"
                                />
                                <AuthCarousel
                                    img="/images/admin.svg"
                                    title="Yönetici Paneli"
                                    desc="Tek Yerden Yönetim"
                                />
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
