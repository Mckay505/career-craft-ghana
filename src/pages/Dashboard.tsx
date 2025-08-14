import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from '@supabase/supabase-js';
import Header from "@/components/sections/Header";
import Watermark from "@/components/layout/Watermark";
import { Download, Clock, CheckCircle, FileText } from "lucide-react";

interface Order {
  id: string;
  amount: number;
  currency: string;
  payment_method: string;
  status: string;
  service_type: string;
  created_at: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session?.user) {
          navigate('/auth');
        } else {
          loadOrders(session.user.id);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate('/auth');
      } else {
        loadOrders(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadOrders = async (userId: string) => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (data) {
      setOrders(data);
    }
    setIsLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getServiceName = (serviceType: string) => {
    switch (serviceType) {
      case 'basic':
        return 'CV Creation';
      case 'premium':
        return 'CV + Cover Letter';
      case 'ultimate':
        return 'Complete Package';
      default:
        return serviceType;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      <Header />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              Your Dashboard
            </h1>
            <p className="text-muted-foreground">
              Track your orders and download your completed documents
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Loading your orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <Card className="text-center py-8">
              <CardContent>
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Orders Yet</h3>
                <p className="text-muted-foreground mb-4">
                  You haven't placed any orders yet. Start by creating your profile and choosing a service package.
                </p>
                <Button onClick={() => navigate('/profile')}>
                  Create Your Profile
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id} className="shadow-elegant border-0">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {getStatusIcon(order.status)}
                          {getServiceName(order.service_type)}
                        </CardTitle>
                        <CardDescription>
                          Ordered on {new Date(order.created_at).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold">
                          {order.currency.toUpperCase()} {(order.amount / 100).toFixed(2)}
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        Payment Method: {order.payment_method.toUpperCase()}
                      </div>
                      {order.status === 'paid' && (
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download CV
                        </Button>
                      )}
                      {order.status === 'pending' && (
                        <div className="text-sm text-muted-foreground">
                          Your CV is being prepared...
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <div className="text-center pt-8">
                <Button onClick={() => navigate('/profile')} variant="outline">
                  Order Another CV
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Watermark />
    </div>
  );
};

export default Dashboard;