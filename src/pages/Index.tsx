import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { products, allOmegaTypes, allTags, type Product } from '@/data/products';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Index() {
  const [cart, setCart] = useState<Array<{product: Product, quantity: number}>>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'nuts' | 'seeds'>('all');
  const [selectedOmega, setSelectedOmega] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [orderData, setOrderData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    comment: '',
    delivery: 'courier',
    payment: 'card'
  });

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.product.id === product.id 
          ? {...item, quantity: item.quantity + 1}
          : item
      ));
    } else {
      setCart([...cart, {product, quantity: 1}]);
    }
    setIsCartOpen(true);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleOmega = (omega: string) => {
    setSelectedOmega(prev => 
      prev.includes(omega) ? prev.filter(o => o !== omega) : [...prev, omega]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
      
      if (selectedOmega.length > 0) {
        const hasOmega = selectedOmega.some(omega => product.omega.includes(omega));
        if (!hasOmega) return false;
      }
      
      if (selectedTags.length > 0) {
        const hasTags = selectedTags.some(tag => product.tags.includes(tag));
        if (!hasTags) return false;
      }
      
      if (priceRange === 'low' && product.price > 1000) return false;
      if (priceRange === 'medium' && (product.price < 1000 || product.price > 1500)) return false;
      if (priceRange === 'high' && product.price < 1500) return false;
      
      return true;
    });
  }, [selectedCategory, selectedOmega, selectedTags, priceRange]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedOmega([]);
    setSelectedTags([]);
    setPriceRange('all');
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center">
              <span className="text-2xl">🌿</span>
            </div>
            <span className="text-2xl font-cormorant font-bold text-primary">Грин Пауэр</span>
          </div>
          
          <div className="hidden md:flex gap-8 items-center">
            <a href="#catalog" className="text-foreground/80 hover:text-primary transition-colors">Каталог</a>
            <a href="#technology" className="text-foreground/80 hover:text-primary transition-colors">Технология</a>
            <a href="#benefits" className="text-foreground/80 hover:text-primary transition-colors">Польза</a>
            <a href="#business" className="text-foreground/80 hover:text-primary transition-colors">Для бизнеса</a>
            <a href="#contacts" className="text-foreground/80 hover:text-primary transition-colors">Контакты</a>
          </div>

          <Button 
            onClick={() => setIsCartOpen(true)}
            variant="outline" 
            size="icon"
            className="relative border-primary/30 hover:border-primary"
          >
            <Icon name="ShoppingCart" size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <Badge className="bg-gold/20 text-gold border-gold/30">100% натуральный продукт</Badge>
              <h1 className="text-5xl md:text-7xl font-cormorant font-bold leading-tight">
                Живое масло.
                <br />
                <span className="text-primary">Настоящий вкус</span>
                <br />
                и польза от природы
              </h1>
              <p className="text-lg text-muted-foreground">
                Сыродавленные масла премиум класса по уникальной технологии активации. 
                Высокое содержание Омега-3, 6 и 9. Без консервантов и добавок.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Выбрать масло
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-primary/30 hover:border-primary">
                  О технологии
                </Button>
              </div>
            </div>
            
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-nature/20 blur-3xl rounded-full"></div>
              <img 
                src="https://cdn.poehali.dev/projects/69989c02-0e01-448d-a9c1-5528fed42914/files/b3809a45-cce3-4bf5-8096-ec5f789d1996.jpg"
                alt="Premium oil drop"
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'Zap',
                title: 'Технология активации',
                desc: 'Вымачивание, озонирование и сушка перед отжимом'
              },
              {
                icon: 'Leaf',
                title: '100% натуральный состав',
                desc: 'Без консервантов, красителей и химических добавок'
              },
              {
                icon: 'Heart',
                title: 'Высокие Омега-кислоты',
                desc: 'Омега-3, 6, 9 для здоровья и иммунитета'
              }
            ].map((item, i) => (
              <Card key={i} className="bg-card border-border/50 hover:border-primary/50 transition-all hover:scale-105">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gold/20 to-nature/20 rounded-full flex items-center justify-center">
                    <Icon name={item.icon as any} size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-cormorant font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-12">
            <Badge className="bg-gold/20 text-gold border-gold/30">Полный каталог — 13 масел</Badge>
            <h2 className="text-4xl md:text-5xl font-cormorant font-bold">Наш ассортимент</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Премиальные масла холодного отжима из орехов и семян
            </p>
          </div>

          <div className="mb-8 space-y-6">
            <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as any)}>
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                <TabsTrigger value="all">Все масла</TabsTrigger>
                <TabsTrigger value="nuts">Ореховые</TabsTrigger>
                <TabsTrigger value="seeds">Семенные</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="bg-card border border-border rounded-lg p-6 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Icon name="Filter" size={18} />
                    Фильтры по Омега-кислотам
                  </h3>
                  {(selectedOmega.length > 0 || selectedTags.length > 0 || priceRange !== 'all') && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Сбросить все
                    </Button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {allOmegaTypes.map(omega => (
                    <Badge
                      key={omega}
                      variant={selectedOmega.includes(omega) ? 'default' : 'outline'}
                      className="cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => toggleOmega(omega)}
                    >
                      {omega}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Icon name="Target" size={18} />
                  Фильтры по назначению
                </h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                      className="cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Icon name="DollarSign" size={18} />
                  Цена
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={priceRange === 'all' ? 'default' : 'outline'}
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => setPriceRange('all')}
                  >
                    Все цены
                  </Badge>
                  <Badge
                    variant={priceRange === 'low' ? 'default' : 'outline'}
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => setPriceRange('low')}
                  >
                    До 1000 ₽
                  </Badge>
                  <Badge
                    variant={priceRange === 'medium' ? 'default' : 'outline'}
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => setPriceRange('medium')}
                  >
                    1000-1500 ₽
                  </Badge>
                  <Badge
                    variant={priceRange === 'high' ? 'default' : 'outline'}
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => setPriceRange('high')}
                  >
                    От 1500 ₽
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="Package" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">По выбранным фильтрам товары не найдены</p>
              <Button variant="outline" onClick={clearFilters} className="mt-4">
                Сбросить фильтры
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
              <Card key={product.id} className="group bg-card border-border/50 hover:border-primary/50 transition-all overflow-hidden">
                <div className="aspect-square overflow-hidden bg-muted">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-cormorant font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.nameEn}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {product.omega.map((o, idx) => (
                      <Badge key={idx} variant="outline" className="border-nature/30 text-nature text-xs">
                        {o}
                      </Badge>
                    ))}
                  </div>
                  
                  <ul className="space-y-1">
                    {product.benefits.map((benefit, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                        <Icon name="Check" size={16} className="text-primary" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-4 border-t border-border space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-cormorant font-bold text-primary">{product.price} ₽</span>
                      <Button 
                        onClick={() => addToCart(product)}
                        size="sm" 
                        className="bg-primary hover:bg-primary/90"
                      >
                        В корзину
                      </Button>
                    </div>
                    <Link to={`/product/${product.slug}`}>
                      <Button variant="ghost" size="sm" className="w-full">
                        Подробнее
                        <Icon name="ArrowRight" size={16} className="ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="technology" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-12">
            <Badge className="bg-gold/20 text-gold border-gold/30">Уникальная технология</Badge>
            <h2 className="text-4xl md:text-5xl font-cormorant font-bold">Процесс производства</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Наша эксклюзивная технология активации делает масло максимально усвояемым
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Вымачивание', desc: 'Семечки и орехи насыщаются влагой, запускается процесс пробуждения' },
              { step: '02', title: 'Озонирование', desc: 'Обработка озоном для безопасности и лучшего усвоения' },
              { step: '03', title: 'Сушка', desc: 'Бережная сушка при низких температурах сохраняет все витамины' },
              { step: '04', title: 'Холодный отжим', desc: 'Сыродавленное масло без нагрева — все полезные свойства остаются' }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-card border border-border/50 rounded-lg p-6 space-y-3 h-full hover:border-primary/50 transition-all">
                  <div className="text-6xl font-cormorant font-bold text-primary/20">{item.step}</div>
                  <h3 className="text-xl font-cormorant font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <Icon name="ArrowRight" size={24} className="text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="business" className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="bg-gradient-to-br from-nature to-nature-dark border-nature/30 overflow-hidden">
            <CardContent className="p-12 md:p-16 text-center space-y-6">
              <Badge className="bg-gold/20 text-gold border-gold/30">B2B</Badge>
              <h2 className="text-3xl md:text-5xl font-cormorant font-bold text-foreground">
                Сотрудничество для бизнеса
              </h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                Увеличьте средний чек и привлеките лояльную аудиторию. 
                Эксклюзивные условия для сетей, эко-магазинов и ресторанов.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Получить коммерческое предложение
                <Icon name="Mail" size={20} className="ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer id="contacts" className="py-12 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center">
                  <span className="text-2xl">🌿</span>
                </div>
                <span className="text-xl font-cormorant font-bold text-primary">Грин Пауэр</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Живые продукты для здорового образа жизни
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Ореховые масла</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Семенные масла</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Наборы</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#technology" className="hover:text-primary transition-colors">Технология</a></li>
                <li><a href="#benefits" className="hover:text-primary transition-colors">Польза масел</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Доставка</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (XXX) XXX-XX-XX</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>info@greenpower.ru</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2024 ООО «Грин Пауэр». Все права защищены.</p>
          </div>
        </div>
      </footer>

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="font-cormorant text-2xl">Корзина</SheetTitle>
          </SheetHeader>
          
          <div className="mt-8 space-y-4">
            {cart.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">Корзина пуста</p>
            ) : (
              <>
                {cart.map((item) => (
                  <Card key={item.product.id}>
                    <CardContent className="p-4 flex gap-4">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.product.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.product.price} ₽</p>
                        <p className="text-sm">Количество: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">{item.product.price * item.quantity} ₽</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between text-lg font-semibold mb-4">
                    <span>Итого:</span>
                    <span className="text-primary">{cartTotal} ₽</span>
                  </div>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90" 
                    size="lg"
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                  >
                    Оформить заказ
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-cormorant text-3xl">Оформление заказа</DialogTitle>
            <DialogDescription>
              Заполните данные для доставки вашего заказа
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Контактные данные</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">ФИО *</Label>
                  <Input 
                    id="name" 
                    placeholder="Иванов Иван Иванович"
                    value={orderData.name}
                    onChange={(e) => setOrderData({...orderData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input 
                    id="phone" 
                    placeholder="+7 (999) 123-45-67"
                    value={orderData.phone}
                    onChange={(e) => setOrderData({...orderData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="example@mail.ru"
                  value={orderData.email}
                  onChange={(e) => setOrderData({...orderData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Доставка</h3>
              
              <RadioGroup value={orderData.delivery} onValueChange={(v) => setOrderData({...orderData, delivery: v})}>
                <div className="flex items-center space-x-2 p-4 border border-border rounded-lg hover:border-primary cursor-pointer">
                  <RadioGroupItem value="courier" id="courier" />
                  <Label htmlFor="courier" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Icon name="Truck" size={20} className="text-primary" />
                      <div>
                        <p className="font-semibold">Курьерская доставка</p>
                        <p className="text-sm text-muted-foreground">Доставим в течение 1-3 дней</p>
                      </div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border border-border rounded-lg hover:border-primary cursor-pointer">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Icon name="Store" size={20} className="text-primary" />
                      <div>
                        <p className="font-semibold">Самовывоз</p>
                        <p className="text-sm text-muted-foreground">Заберите из нашего офиса</p>
                      </div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border border-border rounded-lg hover:border-primary cursor-pointer">
                  <RadioGroupItem value="post" id="post" />
                  <Label htmlFor="post" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Icon name="Package" size={20} className="text-primary" />
                      <div>
                        <p className="font-semibold">Почта России</p>
                        <p className="text-sm text-muted-foreground">Доставка по всей России 5-10 дней</p>
                      </div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              <div className="space-y-2">
                <Label htmlFor="address">Адрес доставки *</Label>
                <Textarea 
                  id="address" 
                  placeholder="Улица, дом, квартира, подъезд, этаж"
                  value={orderData.address}
                  onChange={(e) => setOrderData({...orderData, address: e.target.value})}
                  rows={3}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Оплата</h3>
              
              <RadioGroup value={orderData.payment} onValueChange={(v) => setOrderData({...orderData, payment: v})}>
                <div className="flex items-center space-x-2 p-4 border border-border rounded-lg hover:border-primary cursor-pointer">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Icon name="CreditCard" size={20} className="text-primary" />
                      <div>
                        <p className="font-semibold">Онлайн оплата картой</p>
                        <p className="text-sm text-muted-foreground">Безопасная оплата через банк</p>
                      </div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border border-border rounded-lg hover:border-primary cursor-pointer">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Icon name="Banknote" size={20} className="text-primary" />
                      <div>
                        <p className="font-semibold">Наличными при получении</p>
                        <p className="text-sm text-muted-foreground">Оплатите курьеру</p>
                      </div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment">Комментарий к заказу</Label>
              <Textarea 
                id="comment" 
                placeholder="Например: позвонить за час до доставки"
                value={orderData.comment}
                onChange={(e) => setOrderData({...orderData, comment: e.target.value})}
                rows={2}
              />
            </div>

            <Card className="bg-card/50">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">Ваш заказ:</h3>
                {cart.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span>{item.product.name} x {item.quantity}</span>
                    <span className="font-semibold">{item.product.price * item.quantity} ₽</span>
                  </div>
                ))}
                <div className="pt-4 border-t border-border flex justify-between text-lg font-bold">
                  <span>Итого:</span>
                  <span className="text-primary">{cartTotal} ₽</span>
                </div>
              </CardContent>
            </Card>

            <Button 
              size="lg" 
              className="w-full bg-primary hover:bg-primary/90"
              onClick={() => {
                alert('Спасибо за заказ! Мы свяжемся с вами в ближайшее время.');
                setIsCheckoutOpen(false);
                setCart([]);
                setOrderData({
                  name: '',
                  phone: '',
                  email: '',
                  address: '',
                  comment: '',
                  delivery: 'courier',
                  payment: 'card'
                });
              }}
            >
              Подтвердить заказ
              <Icon name="Check" size={20} className="ml-2" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}