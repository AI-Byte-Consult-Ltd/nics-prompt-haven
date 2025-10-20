import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import woodBackground from "@/assets/wood-background.jpg";
import cottageIllustration from "@/assets/cottage-illustration.png";

const Index = () => {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [priceLink, setPriceLink] = useState("");
  const [isSubmittingPrompt, setIsSubmittingPrompt] = useState(false);
  const [isSubmittingPrice, setIsSubmittingPrice] = useState(false);

  const handlePromptSubmit = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите ваш запрос",
        variant: "destructive",
      });
      return;
    }

    setIsSubmittingPrompt(true);
    
    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In production, replace with:
      // const response = await fetch('/api/workflow', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ type: 'prompt', data: prompt })
      // });
      
      toast({
        title: "✅ Успешно",
        description: "Данные успешно отправлены в систему.",
      });
      setPrompt("");
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить данные. Попробуйте снова.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingPrompt(false);
    }
  };

  const handlePriceSubmit = async () => {
    if (!priceLink.trim()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите ссылку",
        variant: "destructive",
      });
      return;
    }

    // Basic URL validation
    try {
      new URL(priceLink);
    } catch {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите корректную ссылку",
        variant: "destructive",
      });
      return;
    }

    setIsSubmittingPrice(true);
    
    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In production, replace with:
      // const response = await fetch('/api/workflow', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ type: 'price', data: priceLink })
      // });
      
      toast({
        title: "✅ Успешно",
        description: "Данные успешно отправлены в систему.",
      });
      setPriceLink("");
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить данные. Попробуйте снова.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingPrice(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        backgroundImage: `url(${woodBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/50 via-background/70 to-background/60 backdrop-blur-[1px]" />
      
      {/* Main content container */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header */}
        <header className="py-8 md:py-12 px-4 text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-primary mb-3 tracking-tight">
            НЕВОПРОС
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 font-light">
            Enter your data — NICS AI will handle the rest.
          </p>
        </header>

        {/* Main content area */}
        <main className="flex-1 px-4 py-6 flex items-center justify-center">
          <div className="w-full max-w-6xl grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Block 1 - Prompt Input */}
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-soft border border-border/50 animate-fade-in hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <span className="text-2xl">📝</span>
                </div>
                <h2 className="text-2xl font-semibold text-foreground">
                  Введите ваш запрос
                </h2>
              </div>
              
              <Textarea
                placeholder="Введите ваш текст или запрос здесь..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[180px] mb-4 resize-none text-base bg-background/50 backdrop-blur-sm border-border/50 focus:border-accent"
              />
              
              <Button
                onClick={handlePromptSubmit}
                disabled={isSubmittingPrompt}
                variant="wooden"
                size="lg"
                className="w-full font-semibold text-base"
              >
                {isSubmittingPrompt ? "Отправка..." : "Применить"}
              </Button>
              
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Ваш запрос автоматически интегрируется в Nix AI Workflow.
              </p>
            </div>

            {/* Block 2 - Price Link Input */}
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-soft border border-border/50 animate-fade-in-delay hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
                <h2 className="text-2xl font-semibold text-foreground">
                  Укажите ссылку на ваш прайс-лист
                </h2>
              </div>
              
              <div className="space-y-4 mb-4">
                <Input
                  type="url"
                  placeholder="https://drive.google.com/..."
                  value={priceLink}
                  onChange={(e) => setPriceLink(e.target.value)}
                  className="text-base bg-background/50 backdrop-blur-sm border-border/50 focus:border-accent h-12"
                />
                
                {/* Visual spacer to balance with textarea height */}
                <div className="min-h-[140px] flex items-center justify-center opacity-60">
                  <img 
                    src={cottageIllustration} 
                    alt="Cottage illustration" 
                    className="w-48 h-48 object-contain"
                  />
                </div>
              </div>
              
              <Button
                onClick={handlePriceSubmit}
                disabled={isSubmittingPrice}
                variant="wooden"
                size="lg"
                className="w-full font-semibold text-base"
              >
                {isSubmittingPrice ? "Отправка..." : "Применить"}
              </Button>
              
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Введите ссылку на ваш актуальный прайс-лист. Данные будут обновлены автоматически.
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 px-4 border-t border-border/30 bg-card/30 backdrop-blur-sm">
          <div className="text-center text-sm text-foreground/60 font-light space-y-1">
            <p>© Copyright 2025</p>
            <p>Site created by NICS AI Ecosystem</p>
            <p>by AI Byte Consult Ltd.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
