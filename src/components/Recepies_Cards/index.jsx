import { Card } from './Card'
import { CardHeader } from './CardHeader'
import { CardTitle } from './CardTitle'
import { CardContent } from './CardContent'


export const Recepies_Cards = () => {
  return (
    <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 flex justify-center ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8   ">


        <Card>
          <CardHeader>
            <CardTitle>Spaghetti a la Boloñesa</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              alt="Spaghetti Bolognese"
              className="w-full h-48 object-cover aspect-w-16 aspect-h-9 rounded-md"
              src="/assets/img/espagueti.jpg"

            />
            <p className="mt-2 sm:mt-4 text-sm sm:text-base">Un plato clásico italiano con una salsa rica con carne servida sobre espaguetis..</p>
          </CardContent>
        </Card>



        <Card>
          <CardHeader>
            <CardTitle>Pollo tikka masala</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              alt="Chicken Tikka Masala"
              className="w-full h-48 object-cover aspect-w-16 aspect-h-9 rounded-md"
              src="/assets/img/chicken.jpg"
            />
            <p className="mt-4">
              Un plato popular de la India hecho con pollo en una salsa cremosa, picante y de tomate..</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tacos de res</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              alt="Beef Tacos"
              className="w-full h-48 object-cover aspect-w-16 aspect-h-9 rounded-md"
              src="/assets/img/beefTacos.jpg"
            />
            <p className="mt-4">Un plato mexicano con carne de res, lechuga y queso servido en una cáscara de taco crujiente.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Revuelto de verduras.</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              alt="Vegetable Stir Fry"
              className="w-full h-48 object-cover aspect-w-16 aspect-h-9 rounded-md"
              src="/assets/img/vegetales.jpg"
            />
            <p className="mt-4">Un plato saludable y colorido con una variedad de verduras salteadas en una salsa sabrosa.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Paella de mariscos</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              alt="Seafood Paella"
              className="w-full h-48 object-cover aspect-w-16 aspect-h-9 rounded-md"
              src="/assets/img/paella.jpg"

            />
            <p className="mt-4">Un plato tradicional español con arroz, varios tipos de mariscos y una mezcla de especias.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Torta de chocolate</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              alt="Chocolate Cake"
              className="w-full h-48 object-cover aspect-w-16 aspect-h-9 rounded-md"
              src="/assets/img/chocolate.jpg"

            />
            <p className="mt-4">
              Un postre rico y húmedo hecho con chocolate negro
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
