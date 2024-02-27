export const NavBar = () => {
    return (
        <nav className="container max-w-full mt-24">

            <div className="flex justify-around mt-5 mx-20 pb-4 border-b-2 border-verde_oscuro font-medium text-gris_texto text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl ">

                <div id="pagPrincipal" className="border-t-2 border-transparent hover:border-t-2 hover:border-verde_claro ">
                    <a href="/dashboard" className="hover:text-gray-900"> Página principal</a>
                </div>

                <div id="consultante" className="border-t-2 border-transparent hover:border-t-2 hover:border-verde_claro">
                    <a href="/consultantes" className="hover:text-gray-900" > Consultantes</a>
                </div>

                <div id="recetas" className="border-t-2 border-transparent hover:border-t-2 hover:border-verde_claro">
                    <a href="/recetas" className="hover:text-gray-900" > Recetas</a>
                </div>

            </div>

        </nav>
    )
}