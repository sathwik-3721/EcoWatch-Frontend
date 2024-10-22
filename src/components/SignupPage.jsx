import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, UserPlus, Check, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function SignupPage() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [dob, setDob] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [showPopup, setShowPopup] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState({
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
    length: false,
  })
  const navigate = useNavigate()

  useEffect(() => {
    let timer
    if (showPopup) {
      timer = setTimeout(() => {
        navigate('/login')
      }, 5000)
    }
    return () => clearTimeout(timer)
  }, [showPopup, navigate])

  useEffect(() => {
    validatePassword(password)
  }, [password])

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(email)
  }

  const validatePassword = (password) => {
    setPasswordStrength({
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      length: password.length >= 8,
    })
  }

  const isPasswordValid = Object.values(passwordStrength).every(Boolean)

  const handleSignup = async (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!firstName.trim()) newErrors.firstName = 'First name is required'
    if (!lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!validateEmail(email)) newErrors.email = 'Please enter a valid email address'
    if (!mobileNumber) newErrors.mobileNumber = 'Mobile number is required'
    if (!dob.trim()) newErrors.dob = 'Date of birth is required'
    if (!address.trim()) newErrors.address = 'Address is required'
    if (!isPasswordValid) {
      newErrors.password = 'Password does not meet all requirements'
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      const response = await fetch('http://localhost:8000/v1/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          mobileNumber,
          dob,
          address,
          password,
        }),
      })

      if (response.ok) {
        setShowPopup(true)
      } else {
        const errorData = await response.json()
        setErrors({ general: errorData.message || 'Signup failed' })
      }
    } catch (error) {
      console.error('Error during signup:', error)
      setErrors({ general: 'An error occurred. Please try again.' })
    }
  }

  const PasswordCheckItem = ({ isValid, text }) => (
    <div className={`flex items-center ${isValid ? 'text-green-600' : 'text-red-600'}`}>
      {isValid ? <Check className="h-4 w-4 mr-2" /> : <X className="h-4 w-4 mr-2" />}
      <span className="text-sm">{text}</span>
    </div>
  )
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 flex flex-col items-center justify-center py-12 px-4">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <div className="flex items-center mb-4">
            <Link to="/" className="text-green-700 hover:text-green-500">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <CardTitle className="text-2xl font-bold text-green-700 ml-2">EcoWatch Signup</CardTitle>
          </div>
          <CardDescription>Create your account to start monitoring the environment</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                  {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobileNumber">Mobile Number</Label>
                <PhoneInput
                  country={'us'}
                  value={mobileNumber}
                  onChange={(phone) => setMobileNumber(phone)}
                  inputProps={{
                    id: 'mobileNumber',
                    required: true,
                  }}
                  containerClass="w-full"
                  inputClass="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  buttonClass="border border-gray-300 rounded-l-md"
                />
                {errors.mobileNumber && <p className="text-red-500 text-sm">{errors.mobileNumber}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
                {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </button>
                </div>
                <div className="space-y-1 mt-2">
                  <PasswordCheckItem isValid={passwordStrength.uppercase} text="At least one uppercase letter" />
                  <PasswordCheckItem isValid={passwordStrength.lowercase} text="At least one lowercase letter" />
                  <PasswordCheckItem isValid={passwordStrength.number} text="At least one number" />
                  <PasswordCheckItem isValid={passwordStrength.specialChar} text="At least one special character" />
                  <PasswordCheckItem isValid={passwordStrength.length} text="At least 8 characters long" />
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-2 text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  >
                    {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
              </div>
              {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}
              <Button 
                type="submit" 
                className="w-full bg-green-700 hover:bg-green-600 text-white" 
                disabled={!isPasswordValid}
              >
                <UserPlus className="mr-2 h-5 w-5" />
                Sign Up
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <div className="text-sm">
            Already have an account? <Link to="/login" className="text-green-700 hover:text-green-500">Login here</Link>
          </div>
        </CardFooter>
      </Card>
      {showPopup && (
        <Alert className="fixed top-4 right-4 w-96 bg-green-100 border-green-400">
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            Your account has been created successfully. You will be redirected to the login page in 5 seconds.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}