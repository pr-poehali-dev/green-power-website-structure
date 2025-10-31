import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

interface Product {
  id: number;
  name: string;
  nameEn: string;
  price: number;
  omega: string;
  benefits: string[];
  image: string;
  category: 'nuts' | 'seeds';
}

const products: Product[] = [
  {
    id: 1,
    name: 'Масло кедра',
    nameEn: 'Cedar Nut Oil',
    price: 1890,
    omega: 'Омега-6, Омега-9',
    benefits: ['Укрепление иммунитета', 'Здоровье ЖКТ', 'Антиоксиданты'],
    image: 'https://cdn.poehali.dev/projects/69989c02-0e01-448d-a9c1-5528fed42914/files/48a4c523-6d1b-477e-b726-ffb3d510fd66.jpg',
    category: 'nuts'
  },
  {
    id: 2,
    name: 'Масло льна',
    nameEn: 'Flax Seed Oil',
    price: 890,
    omega: 'Омега-3, Омега-6',
    benefits: ['Мозговая активность', 'Чистая кожа', 'Здоровое сердце'],
    image: 'https://cdn.poehali.dev/projects/69989c02-0e01-448d-a9c1-5528fed42914/files/17ac714d-59fd-4de9-b65b-95ed43bc9cb5.jpg',
    category: 'seeds'
  },
  {
    id: 3,
    name: 'Масло тыквы',
    nameEn: 'Pumpkin Seed Oil',
    price: 990,
    omega: 'Омега-6, Омега-9',
    benefits: ['Мужское здоровье', 'Поддержка печени', 'Витамин E'],
    image: 'https://cdn.poehali.dev/projects/69989c02-0e01-448d-a9c1-5528fed42914/files/17ac714d-59fd-4de9-b65b-95ed43bc9cb5.jpg',
    category: 'seeds'
  },
  {
    id: 4,
    name: 'Масло черного тмина',
    nameEn: 'Black Cumin Oil',
    price: 1290,
    omega: 'Омега-6, Омега-9',
    benefits: ['Сильный иммунитет', 'Антибактериальное', 'Очищение организма'],
    image: 'https://cdn.poehali.dev/projects/69989c02-0e01-448d-a9c1-5528fed42914/files/17ac714d-59fd-4de9-b65b-95ed43bc9cb5.jpg',
    category: 'seeds'
  }
];

export default function Index() {
  const [cart, setCart] = useState<Array<{product: Product, quantity: number}>>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

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
            <Badge className="bg-gold/20 text-gold border-gold/30">Хиты продаж</Badge>
            <h2 className="text-4xl md:text-5xl font-cormorant font-bold">Наш ассортимент</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Премиальные масла холодного отжима из орехов и семян
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
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
                  
                  <Badge variant="outline" className="border-nature/30 text-nature">
                    {product.omega}
                  </Badge>
                  
                  <ul className="space-y-1">
                    {product.benefits.map((benefit, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                        <Icon name="Check" size={16} className="text-primary" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-2xl font-cormorant font-bold text-primary">{product.price} ₽</span>
                    <Button 
                      onClick={() => addToCart(product)}
                      size="sm" 
                      className="bg-primary hover:bg-primary/90"
                    >
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
                  <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                    Оформить заказ
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
