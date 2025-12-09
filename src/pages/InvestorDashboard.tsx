import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Wallet,
  Sprout,
  Package,
  Eye,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatsCard from '@/components/shared/StatsCard';
import InvestmentCard from '@/components/shared/InvestmentCard';
import { useStore } from '@/store/useStore';
import { farmProjects, investments as mockInvestments } from '@/lib/mockData';
import { toast } from 'sonner';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { month: 'Jan', value: 50000 },
  { month: 'Feb', value: 75000 },
  { month: 'Mar', value: 120000 },
  { month: 'Apr', value: 180000 },
  { month: 'May', value: 250000 },
  { month: 'Jun', value: 320000 },
  { month: 'Jul', value: 400000 },
  { month: 'Aug', value: 480000 },
  { month: 'Sep', value: 520000 },
  { month: 'Oct', value: 580000 },
  { month: 'Nov', value: 650000 },
  { month: 'Dec', value: 700000 },
];

const InvestorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { walletBalance, userInvestments, addInvestment, updateWalletBalance } = useStore();
  const [investModalOpen, setInvestModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof farmProjects[0] | null>(null);
  const [investAmount, setInvestAmount] = useState('');

  const allInvestments = [...mockInvestments, ...userInvestments];
  const totalInvested = allInvestments.reduce((sum, inv) => sum + inv.amount, 0);
  const roiEarned = allInvestments.reduce((sum, inv) => sum + (inv.amount * inv.roi / 100), 0);
  const activeFarms = allInvestments.filter(inv => inv.status === 'active').length;

  const handleInvest = (project: typeof farmProjects[0]) => {
    setSelectedProject(project);
    setInvestAmount('');
    setInvestModalOpen(true);
  };

  const confirmInvestment = () => {
    const amount = parseInt(investAmount);
    if (!amount || amount < 10000) {
      toast.error('Minimum investment is ₦10,000');
      return;
    }
    if (amount > walletBalance) {
      toast.error('Insufficient wallet balance');
      return;
    }

    if (selectedProject) {
      addInvestment({
        id: Date.now().toString(),
        projectId: selectedProject.id,
        projectName: selectedProject.name,
        amount,
        roi: selectedProject.roi,
        status: 'active',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        farmImage: selectedProject.image,
      });
      setInvestModalOpen(false);
      toast.success(`Successfully invested ₦${amount.toLocaleString()} in ${selectedProject.name}`);
    }
  };

  const statusColors: Record<string, string> = {
    active: 'bg-green-100 text-green-700',
    matured: 'bg-blue-100 text-blue-700',
    withdrawn: 'bg-gray-100 text-gray-700',
  };

  return (
    <DashboardLayout userRole="investor">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Investor Dashboard</h1>
            <p className="text-gray-500">Track your investments and discover new opportunities</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => updateWalletBalance(100000)}>
              <Wallet className="h-4 w-4 mr-2" />
              Fund Wallet
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => navigate('/investor/investments')}>
              <TrendingUp className="h-4 w-4 mr-2" />
              New Investment
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Invested"
            value={`₦${totalInvested.toLocaleString()}`}
            icon={<Wallet className="h-6 w-6 text-green-600" />}
            change={{ value: 12.5, type: 'increase' }}
            iconBgColor="bg-green-100"
          />
          <StatsCard
            title="ROI Earned"
            value={`₦${roiEarned.toLocaleString()}`}
            icon={<TrendingUp className="h-6 w-6 text-blue-600" />}
            change={{ value: 8.2, type: 'increase' }}
            iconBgColor="bg-blue-100"
          />
          <StatsCard
            title="Active Farms"
            value={activeFarms}
            icon={<Sprout className="h-6 w-6 text-amber-600" />}
            iconBgColor="bg-amber-100"
          />
          <StatsCard
            title="Produce Requests"
            value="3"
            icon={<Package className="h-6 w-6 text-purple-600" />}
            iconBgColor="bg-purple-100"
          />
        </div>

        {/* Chart and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portfolio Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Portfolio Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#888" fontSize={12} />
                    <YAxis stroke="#888" fontSize={12} tickFormatter={(value) => `₦${(value / 1000)}k`} />
                    <Tooltip
                      formatter={(value: number) => [`₦${value.toLocaleString()}`, 'Portfolio Value']}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#16A34A"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate('/tree-naira')}
              >
                <ArrowUpRight className="h-4 w-4 mr-2 text-green-600" />
                Invest in Tree Naira
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate('/farm-for-me')}
              >
                <ArrowUpRight className="h-4 w-4 mr-2 text-green-600" />
                Start Farm for Me
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate('/marketplace')}
              >
                <ArrowUpRight className="h-4 w-4 mr-2 text-green-600" />
                Browse Marketplace
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => updateWalletBalance(50000)}
              >
                <ArrowDownRight className="h-4 w-4 mr-2 text-blue-600" />
                Withdraw Funds
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Investments Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>My Investments</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>ROI</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allInvestments.map((investment) => (
                  <TableRow key={investment.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={investment.farmImage}
                          alt={investment.projectName}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <span className="font-medium">{investment.projectName}</span>
                      </div>
                    </TableCell>
                    <TableCell>₦{investment.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-green-600 font-medium">{investment.roi}%</TableCell>
                    <TableCell>
                      <Badge className={statusColors[investment.status]}>
                        {investment.status.charAt(0).toUpperCase() + investment.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{investment.startDate}</TableCell>
                    <TableCell>{investment.endDate}</TableCell>
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
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem disabled={investment.status !== 'matured'}>
                            <Download className="h-4 w-4 mr-2" />
                            Withdraw
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

        {/* Featured Projects */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Featured Investment Opportunities</h2>
            <Button variant="link" onClick={() => navigate('/investor/investments')}>
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {farmProjects.filter(p => p.status === 'live').slice(0, 3).map((project) => (
              <InvestmentCard
                key={project.id}
                project={project}
                onInvest={handleInvest}
                onViewDetails={() => navigate(`/project/${project.id}`)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Investment Modal */}
      <Dialog open={investModalOpen} onOpenChange={setInvestModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invest in {selectedProject?.name}</DialogTitle>
            <DialogDescription>
              Enter the amount you want to invest. Minimum investment is ₦10,000.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Investment Amount (₦)</Label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={investAmount}
                onChange={(e) => setInvestAmount(e.target.value)}
                min={10000}
              />
              <p className="text-sm text-gray-500">
                Wallet Balance: ₦{walletBalance.toLocaleString()}
              </p>
            </div>
            {selectedProject && (
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Expected ROI</span>
                  <span className="font-medium text-green-600">{selectedProject.roi}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-medium">{selectedProject.duration}</span>
                </div>
                {investAmount && (
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-500">Expected Returns</span>
                    <span className="font-bold text-green-600">
                      ₦{(parseInt(investAmount) * (1 + selectedProject.roi / 100)).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInvestModalOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={confirmInvestment}>
              Confirm Investment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default InvestorDashboard;
