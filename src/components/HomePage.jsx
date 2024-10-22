import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bell, Search, MapPin, Users, FileText, Menu, AlertTriangle, Users2, HandshakeIcon, LogOut } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import axios from 'axios'

export default function HomePage() {
  // const [username, setUsername] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName")

  useEffect(() => {
    const email = localStorage.getItem('userEmail')
    console.log('email', email);
    if (email) {
      setIsLoggedIn(true)
      fetchUsername(email)
    }
  }, [])

  const fetchUsername = async (email) => {
    try {
      const response = await axios.get('http://localhost:8000/v1/user/get-username', {
        headers: {
          'Content-Type': 'application/json',
        },
        params: { email }, // Use params for GET request data
      });
      console.log('res', response);

        localStorage.setItem('userName', response.data.username)
    } catch (error) {
      console.error('Error fetching username:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('userEmail')
    setIsLoggedIn(false)
    // setUsername(null)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-4">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col space-y-4 mt-4">
                <Link to="/report" className="text-green-700 hover:text-green-500 flex items-center">
                  <MapPin className="mr-2 h-5 w-5" /> Report
                </Link>
                <Link to="/alerts" className="text-green-700 hover:text-green-500 flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5" /> Alerts
                </Link>
                <Link to="/community" className="text-green-700 hover:text-green-500 flex items-center">
                  <Users2 className="mr-2 h-5 w-5" /> Community
                </Link>
                <Link to="/collaborate" className="text-green-700 hover:text-green-500 flex items-center">
                  <HandshakeIcon className="mr-2 h-5 w-5" /> Collaborate
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link to="/" className="text-2xl font-bold text-green-700 mr-auto">EcoWatch</Link>
          <nav className="flex items-center space-x-4">
            <Select defaultValue="en">
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
              </SelectContent>
            </Select>
            {isLoggedIn ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${userName || 'User'}`} />
                    <AvatarFallback>{userName?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-48">
                  <div className="flex flex-col space-y-2">
                    <p className="text-sm font-medium">{userName}</p>
                    <Button variant="outline" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : null}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Empower Environmental Protection</h1>
          <p className="text-xl text-gray-600 mb-8">Report incidents, stay informed, and engage with your community.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              <MapPin className="mr-2 h-5 w-5" /> Report an Incident
            </Button>
            <Button size="lg" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
              <Bell className="mr-2 h-5 w-5" /> View Alerts
            </Button>
            <Button size="lg" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
              <Users className="mr-2 h-5 w-5" /> Join Community
            </Button>
          </div>
        </section>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-700">Real-time Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Badge variant="destructive" className="mr-2">High</Badge>
                  <span>Air pollution alert in Downtown</span>
                </li>
                <li className="flex items-center">
                  <Badge variant="warning" className="mr-2">Medium</Badge>
                  <span>Deforestation activity reported</span>
                </li>
                <li className="flex items-center">
                  <Badge className="mr-2">Low</Badge>
                  <span>Water quality advisory lifted</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-green-700">Incident Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Interactive Map Placeholder</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Search Reports</h2>
          <div className="flex gap-4">
            <Input type="text" placeholder="Search by keyword or location" className="flex-grow" />
            <Button>
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-green-800 mb-4">Recent Reports</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-lg">Illegal Dumping Reported</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">Location: Riverside Park</p>
                  <p className="text-gray-600 mb-4">Reported: 2 hours ago</p>
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" /> View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

    </div>
  )
}
