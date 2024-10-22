import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Send, Check, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast, Toaster } from 'react-hot-toast'
import axios from 'axios'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [retypePassword, setRetypePassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState({
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
    length: false,
  })
  const [passwordsMatch, setPasswordsMatch] = useState(true)

  useEffect(() => {
    validatePassword(newPassword)
  }, [newPassword])

  useEffect(() => {
    setPasswordsMatch(newPassword === retypePassword)
  }, [newPassword, retypePassword])

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isPasswordValid || !passwordsMatch) {
      toast.error('Please ensure all password requirements are met and passwords match.')
      return
    }
    setIsLoading(true)

    try {
      const response = await axios.post('http://localhost:8000/v1/user/reset-password', { email, newPassword })
      if (response.status === 200) {
        toast.success('Password has been reset successfully.')
        setEmail('')
        setNewPassword('')
        setRetypePassword('')
      } else {
        toast.error('Failed to reset password. Please try again.')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('An error occurred. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const PasswordCheckItem = ({ isValid, text }) => (
    <div className={`flex items-center ${isValid ? 'text-green-600' : 'text-red-600'}`}>
      {isValid ? <Check className="h-4 w-4 mr-2" /> : <X className="h-4 w-4 mr-2" />}
      <span className="text-sm">{text}</span>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 flex flex-col items-center justify-center py-12">
      <Toaster position="top-center" reverseOrder={false} />
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center mb-4">
            <Link to="/login" className="text-green-700 hover:text-green-500">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <CardTitle className="text-2xl font-bold text-green-700 ml-2">Reset Password</CardTitle>
          </div>
          <CardDescription>Enter your email and new password to reset your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-describedby="email-description"
                />
                <p id="email-description" className="text-sm text-gray-500">
                  Enter the email associated with your account.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  aria-describedby="password-requirements"
                />
                <div id="password-requirements" className="space-y-1 mt-2">
                  <PasswordCheckItem isValid={passwordStrength.uppercase} text="At least one uppercase letter" />
                  <PasswordCheckItem isValid={passwordStrength.lowercase} text="At least one lowercase letter" />
                  <PasswordCheckItem isValid={passwordStrength.number} text="At least one number" />
                  <PasswordCheckItem isValid={passwordStrength.specialChar} text="At least one special character" />
                  <PasswordCheckItem isValid={passwordStrength.length} text="At least 8 characters long" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="retype-password">Retype New Password</Label>
                <Input
                  id="retype-password"
                  type="password"
                  value={retypePassword}
                  onChange={(e) => setRetypePassword(e.target.value)}
                  required
                  aria-describedby="password-match"
                />
                {retypePassword && (
                  <p id="password-match" className={`text-sm ${passwordsMatch ? 'text-green-600' : 'text-red-600'}`}>
                    {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={isLoading || !isPasswordValid || !passwordsMatch}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Resetting...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Send className="mr-2 h-4 w-4" /> Reset Password
                  </span>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/login" className="text-sm text-green-600 hover:text-green-500">
            Remember your password? Log in
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
