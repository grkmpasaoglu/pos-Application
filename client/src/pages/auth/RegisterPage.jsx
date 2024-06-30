import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Carousel, Form, Input, message } from 'antd'
import AuthCarousel from '../../components/auth/AuthCarousel'

const RegisterPage = () => {


  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)
  const onFinish = async (values) => {
    setLoading(true)
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/auth/register", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      })
      if (res.status === 200) {
        message.success("Kayıt başarılı.") 
        navigate("/login")
        setLoading(false)
      }
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
              <p>Get Premium'a Kayıt Olun.</p>
              <Form onFinish={onFinish}>
                <Form.Item
                  className="w-80"
                  name={'username'}
                  rules={[
                    { required: true, message: 'Bu alan boş bırakılamaz.' },
                  ]}
                >
                  <Input placeholder="Kullanıcı Adı" />
                </Form.Item>
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
                <Form.Item
                  className="w-80"
                  name={'passwordConfirm'}
                  dependencies={["password"]}
                  rules={[
                    { required: true, message: 'Bu alan boş bırakılamaz.' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Şifreler eşleşmeli !'));
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Şifre Tekrar" />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full"
                  size="large"
                  loading={loading}
                >
                  Kaydol
                </Button>
              </Form>
            </div>
            <div className="text-center mt-12">
              Bir hesabınız mı var ?{' '}
              <Link to="/login" className="text-blue-500">
                Şimdi giriş yapın.
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

export default RegisterPage


