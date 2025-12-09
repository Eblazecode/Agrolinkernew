import React, { useState } from 'react';
import {
  Users,
  TrendingUp,
  Wallet,
  FileCheck,
  CheckCircle,
  XCircle,
  Eye,
  MoreHorizontal,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatsCard from '@/components/shared/StatsCard';
import { demoUsers } from '@/lib/mockData';
import { toast } from 'sonner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Mock KYC data
const kycRequests = [
  { id: '1', name: 'John Adebayo', email: 'john@example.com', type: 'investor', submittedAt: '2025-12-07', status: 'pending', documents: ['ID Card', 'Utility Bill'] },
  { id: '2', name: 'Mary Okonkwo', email: 'mary@example.com', type: 'farmer', submittedAt: '2025-12-06', status: 'pending', documents: ['ID Card', 'Farm License'] },
  { id: '3', name: 'Ahmed Bello', email: 'ahmed@example.com', type: 'investor', submittedAt: '2025-12-05', status: 'approved', documents: ['Passport', 'Bank Statement'] },
];

// Mock chart data
const investmentData = [
  { month: 'Jan', investments: 45, amount: 12000000 },
  { month: 'Feb', investments: 52, amount: 15000000 },
  { month: 'Mar', investments: 61, amount: 18000000 },
  { month: 'Apr', investments: 78, amount: 22000000 },
  { month: 'May', investments: 85, amount: 25000000 },
  { month: 'Jun', investments: 92, amount: 28000000 },
];

const userGrowthData = [
  { month: 'Jan', users: 1200 },
  { month: 'Feb', users: 1450 },
  { month: 'Mar', users: 1800 },
  { month: 'Apr', users: 2200 },
  { month: 'May', users: 2800 },
  { month: 'Jun', users: 3500 },
];

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState(demoUsers);
  const [kyc, setKyc] = useState(kycRequests);
  const [searchQuery, setSearchQuery] = useState('');

  const handleApproveKYC = (id: string) => {
    setKyc(kyc.map(k => k.id === id ? { ...k, status: 'approved' } : k));
    toast.success('KYC approved successfully');
  };

  const handleRejectKYC = (id: string) => {
    setKyc(kyc.map(k => k.id === id ? { ...k, status: 'rejected' } : k));
    toast.error('KYC rejected');
  };

  const handleToggleVerification = (userId: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, verified: !u.verified } : u));
    toast.success('User verification status updated');
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingKYC = kyc.filter(k => k.status === 'pending').length;

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">Manage users, KYC verification, and platform analytics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Users"
            value="45,231"
            icon={<Users className="h-6 w-6 text-blue-600" />}
            change={{ value: 12.5, type: 'increase' }}
            iconBgColor="bg-blue-100"
          />
          <StatsCard
            title="Total Investments"
            value="₦2.4B"
            icon={<TrendingUp className="h-6 w-6 text-green-600" />}
            change={{ value: 8.2, type: 'increase' }}
            iconBgColor="bg-green-100"
          />
          <StatsCard
            title="Platform Revenue"
            value="₦48M"
            icon={<Wallet className="h-6 w-6 text-purple-600" />}
            change={{ value: 15.3, type: 'increase' }}
            iconBgColor="bg-purple-100"
          />
          <StatsCard
            title="Pending KYC"
            value={pendingKYC.toString()}
            icon={<FileCheck className="h-6 w-6 text-amber-600" />}
            iconBgColor="bg-amber-100"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Investment Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={investmentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#888" fontSize={12} />
                    <YAxis stroke="#888" fontSize={12} tickFormatter={(v) => `${v}`} />
                    <Tooltip />
                    <Bar dataKey="investments" fill="#16A34A" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#888" fontSize={12} />
                    <YAxis stroke="#888" fontSize={12} />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for KYC and Users */}
        <Tabs defaultValue="kyc">
          <TabsList>
            <TabsTrigger value="kyc">KYC Verification ({pendingKYC} pending)</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
          </TabsList>

          {/* KYC Tab */}
          <TabsContent value="kyc" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending KYC Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {kyc.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.name}</TableCell>
                        <TableCell>{request.email}</TableCell>
                        <TableCell className="capitalize">{request.type}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {request.documents.map((doc, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {doc}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{request.submittedAt}</TableCell>
                        <TableCell>
                          <Badge className={statusColors[request.status]}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {request.status === 'pending' ? (
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-green-600 hover:text-green-700"
                                onClick={() => handleApproveKYC(request.id)}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 hover:text-red-700"
                                onClick={() => handleRejectKYC(request.id)}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <Button size="sm" variant="ghost">
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>User Management</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Wallet Balance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell className="capitalize">{user.role.replace('_', ' ')}</TableCell>
                        <TableCell>₦{user.walletBalance.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={user.verified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                            {user.verified ? 'Verified' : 'Unverified'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleToggleVerification(user.id)}>
                                {user.verified ? (
                                  <>
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Revoke Verification
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Verify User
                                  </>
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
