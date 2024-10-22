import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Bell, Users2, BarChart2, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom'; // Use Link from react-router-dom

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-green-800">EcoWatch Dashboard</h1>
          
          {/* Link to Login Page */}
          <Link to="/login">
            <Button variant="outline" className="flex items-center">
              <LogIn className="mr-2 h-4 w-4" /> Login
            </Button>
          </Link>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Home Page Overview</CardTitle>
            <CardDescription>Key features of the EcoWatch home page</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Incident Reporting */}
              <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-green-600" />
                    Incident Reporting
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Users can report environmental incidents directly from the home page.
                </CardContent>
              </Card>

              {/* Real-time Alerts */}
              <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Bell className="mr-2 h-5 w-5 text-green-600" />
                    Real-time Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Display of current environmental alerts and notifications.
                </CardContent>
              </Card>

              {/* Community Engagement */}
              <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Users2 className="mr-2 h-5 w-5 text-green-600" />
                    Community Engagement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Features for users to connect and collaborate on environmental issues.
                </CardContent>
              </Card>

              {/* Data Visualization */}
              <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <BarChart2 className="mr-2 h-5 w-5 text-green-600" />
                    Data Visualization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Interactive maps and charts showing environmental data.
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 overflow-hidden">
          <CardHeader>
            <CardTitle>About EcoWatch</CardTitle>
            <CardDescription>Our mission and vision</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="animate-fade-in-up">
                EcoWatch is a cutting-edge environmental monitoring platform dedicated to preserving our planet's ecosystems through technology and community engagement.
              </p>
              <p className="animate-fade-in-up animation-delay-300">
                Our mission is to empower individuals and organizations with real-time data and collaborative tools to address environmental challenges effectively.
              </p>
              <p className="animate-fade-in-up animation-delay-600">
                Join us in our journey to create a sustainable future for generations to come.
              </p>
            </div>
          </CardContent>
        </Card>

        <footer className="mt-8 text-center text-gray-600">
          <p>&copy; 2024 EcoWatch. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
