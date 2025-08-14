import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from '@supabase/supabase-js';
import Header from "@/components/sections/Header";
import Watermark from "@/components/layout/Watermark";
import { CreditCard, Smartphone, CheckCircle } from "lucide-react";

const Payment = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const servicePlans = [
    {
      id: "basic",
      name: "CV Creation",
      price: 50,
      features: [
        "Professional CV tailored to your field",
        "ATS-optimized formatting",
        "2 revision rounds",
        "PDF delivery within 48 hours"
      ]
    },
    {
      id: "premium",
      name: "CV + Cover Letter",
      price: 80,
      features: [
        "Professional CV + Cover Letter",
        "ATS-optimized formatting",
        "3 revision rounds",
        "LinkedIn profile optimization tips",
        "PDF delivery within 24 hours"
      ]
    },
    {
      id: "ultimate",
      name: "Complete Package",
      price: 120,
      features: [
        "Professional CV + Cover Letter + Resume",
        "ATS-optimized formatting",
        "Unlimited revisions for 7 days",
        "LinkedIn profile optimization",
        "Interview preparation guide",
        "PDF delivery within 12 hours"
      ]
    }
  ];

  const [selectedPlan, setSelectedPlan] = useState("basic");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session?.user) {
          navigate('/auth');
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);

    const selectedPlanData = servicePlans.find(plan => plan.id === selectedPlan);
    if (!selectedPlanData) return;

    // Create order record
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        amount: selectedPlanData.price * 100, // Convert to pesewas
        payment_method: paymentMethod,
        payment_reference: phoneNumber,
        service_type: selectedPlan,
        status: 'pending'
      })
      .select()
      .single();

    if (orderError) {
      toast({
        title: "Error",
        description: "Failed to create order. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Simulate payment processing
    setTimeout(async () => {
      // Update order status to paid
      await supabase
        .from('orders')
        .update({ status: 'paid' })
        .eq('id', order.id);

      toast({
        title: "Payment Successful!",
        description: `Your ${selectedPlanData.name} order has been received. We'll send your CV to your email within the specified timeframe.`,
      });

      navigate('/dashboard');
    }, 2000);

    setIsLoading(false);
  };

  const getCurrentPlan = () => servicePlans.find(plan => plan.id === selectedPlan);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      <Header />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              Choose Your Service Package
            </h1>
            <p className="text-muted-foreground">
              Select the perfect package for your career needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {servicePlans.map((plan) => (
              <Card
                key={plan.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-elegant ${
                  selectedPlan === plan.id
                    ? 'ring-2 ring-primary shadow-elegant'
                    : 'border-border'
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary">
                    GH₵{plan.price}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <RadioGroup
                    value={selectedPlan}
                    onValueChange={setSelectedPlan}
                    className="mt-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={plan.id} id={plan.id} />
                      <Label htmlFor={plan.id} className="cursor-pointer">
                        Select this package
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="shadow-elegant border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Information
                </CardTitle>
                <CardDescription>
                  Complete your order for {getCurrentPlan()?.name} - GH₵{getCurrentPlan()?.price}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePayment} className="space-y-6">
                  <div className="space-y-4">
                    <Label>Select Payment Method</Label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="momo" id="momo" />
                        <Smartphone className="h-5 w-5 text-primary" />
                        <Label htmlFor="momo" className="cursor-pointer flex-1">
                          Mobile Money (MTN, Vodafone, AirtelTigo)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg opacity-50">
                        <RadioGroupItem value="card" id="card" disabled />
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <Label htmlFor="card" className="cursor-pointer flex-1">
                          Credit/Debit Card (Coming Soon)
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {paymentMethod === "momo" && (
                    <div className="space-y-2">
                      <Label htmlFor="phone">Mobile Money Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="024 123 4567"
                        required
                      />
                      <p className="text-sm text-muted-foreground">
                        You will receive a prompt on your phone to complete the payment
                      </p>
                    </div>
                  )}

                  <div className="bg-secondary/20 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Order Summary</h3>
                    <div className="flex justify-between items-center">
                      <span>{getCurrentPlan()?.name}</span>
                      <span className="font-semibold">GH₵{getCurrentPlan()?.price}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading || (paymentMethod === "momo" && !phoneNumber)}
                  >
                    {isLoading ? "Processing Payment..." : `Pay GH₵${getCurrentPlan()?.price}`}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By completing this purchase, you agree to our terms of service. 
                    Your CV will be professionally crafted and delivered within the specified timeframe.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Watermark />
    </div>
  );
};

export default Payment;