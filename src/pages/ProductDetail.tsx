import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { products, type Product } from '@/data/products';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CartItem {
  product: Product;
  quantity: number;
}

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Icon name="PackageX" size={64} className="mx-auto text-muted-foreground" />
          <h1 className="text-3xl font-cormorant font-bold">Товар не найден</h1>
          <Button onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            На главную
          </Button>
        </div>
      </div>
    );
  }

  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];
    const existingItem = existingCart.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
      localStorage.setItem('cart', JSON.stringify(existingCart));
    } else {
      existingCart.push({ product, quantity });
      localStorage.setItem('cart', JSON.stringify(existingCart));
    }
    
    navigate('/', { state: { openCart: true } });
  };

  const relatedProducts = products
    .filter(p => p.id !== product.id && (
      p.category === product.category || 
      p.tags.some(tag => product.tags.includes(tag))
    ))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад к каталогу
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden bg-muted opacity-50">
                  <img 
                    src={product.image} 
                    alt={`${product.name} ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <Badge className="bg-gold/20 text-gold border-gold/30 mb-4">
                {product.category === 'nuts' ? 'Ореховое масло' : 'Семенное масло'}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-cormorant font-bold mb-2">{product.name}</h1>
              <p className="text-xl text-muted-foreground">{product.nameEn}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.omega.map((omega, idx) => (
                <Badge key={idx} variant="outline" className="border-nature/30 text-nature">
                  {omega}
                </Badge>
              ))}
            </div>

            <p className="text-lg text-muted-foreground">{product.description}</p>

            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Польза для здоровья:</h3>
              <div className="grid grid-cols-2 gap-3">
                {product.tags.map((tag, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Icon name="Check" size={16} className="text-primary flex-shrink-0" />
                    <span className="text-sm">{tag}</span>
                  </div>
                ))}
              </div>
            </div>

            <Card className="bg-card/50">
              <CardContent className="p-6">
                <div className="flex items-baseline justify-between mb-6">
                  <div>
                    <span className="text-4xl font-cormorant font-bold text-primary">{product.price} ₽</span>
                    <span className="text-muted-foreground ml-2">/ {product.volume}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <span className="text-sm font-semibold">Количество:</span>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Icon name="Minus" size={16} />
                    </Button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Icon name="Plus" size={16} />
                    </Button>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={addToCart}
                >
                  Добавить в корзину — {product.price * quantity} ₽
                  <Icon name="ShoppingCart" size={20} className="ml-2" />
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <Icon name="Truck" size={24} className="mx-auto mb-2 text-primary" />
                <p className="text-sm font-semibold">Доставка</p>
                <p className="text-xs text-muted-foreground">По всей России</p>
              </div>
              <div className="text-center">
                <Icon name="ShieldCheck" size={24} className="mx-auto mb-2 text-primary" />
                <p className="text-sm font-semibold">Качество</p>
                <p className="text-xs text-muted-foreground">Сертификаты</p>
              </div>
              <div className="text-center">
                <Icon name="RefreshCw" size={24} className="mx-auto mb-2 text-primary" />
                <p className="text-sm font-semibold">Возврат</p>
                <p className="text-xs text-muted-foreground">14 дней</p>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="description" className="mb-20">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3">
            <TabsTrigger value="description">Описание</TabsTrigger>
            <TabsTrigger value="usage">Применение</TabsTrigger>
            <TabsTrigger value="recipes">Рецепты</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-cormorant text-2xl">Полное описание</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">О продукте</h3>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Состав</h3>
                  <p className="text-muted-foreground">{product.composition}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Польза</h3>
                  <ul className="space-y-2">
                    {product.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usage" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-cormorant text-2xl">Как применять</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-line">{product.usage}</p>
                
                <div className="mt-6 p-4 bg-gold/10 border border-gold/30 rounded-lg">
                  <div className="flex gap-3">
                    <Icon name="AlertCircle" size={24} className="text-gold flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm mb-1">Важно</p>
                      <p className="text-sm text-muted-foreground">
                        Храните масло в темном прохладном месте. После открытия используйте в течение 30 дней. 
                        Не нагревайте масло выше 40°C для сохранения всех полезных свойств.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recipes" className="mt-8">
            <div className="space-y-6">
              {product.recipes.map((recipe, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <CardTitle className="font-cormorant text-2xl">{recipe.title}</CardTitle>
                    <p className="text-muted-foreground">{recipe.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Icon name="ShoppingBasket" size={18} />
                        Ингредиенты
                      </h4>
                      <ul className="space-y-2">
                        {recipe.ingredients.map((ingredient, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            <span className="text-muted-foreground">{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Icon name="ListOrdered" size={18} />
                        Приготовление
                      </h4>
                      <ol className="space-y-2">
                        {recipe.instructions.map((instruction, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="font-semibold text-primary min-w-6">{i + 1}.</span>
                            <span className="text-muted-foreground">{instruction}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-cormorant font-bold mb-8 text-center">Вам также может понравиться</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} to={`/product/${relatedProduct.slug}`}>
                  <Card className="group bg-card border-border/50 hover:border-primary/50 transition-all overflow-hidden h-full">
                    <div className="aspect-square overflow-hidden bg-muted">
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-cormorant font-semibold mb-2">{relatedProduct.name}</h3>
                      <p className="text-2xl font-cormorant font-bold text-primary">{relatedProduct.price} ₽</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
