import { RouterLinkStub, mount } from "@vue/test-utils"
import PokemonPage from "@/modules/pokemons/pages/PokemonPage.vue"

describe('<PokemonPage />', () => {
    const wrapper = mount(PokemonPage, {
        props: {
            id: 25
        },
        global: {
            stubs: {
                // RouterLink: true
                RouterLink: RouterLinkStub
            }
        }
    })

    test('should render the component correctly', () => {
        expect(wrapper.find('h1').exists()).toBe(true)
        expect(wrapper.find('img').attributes('src')).toBe(
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg`
        )
    })

    test('should redirect to next pokemon', () => {
        const link = wrapper.findComponent(RouterLinkStub)

        // console.log(link.props())

        expect(link.props().to).toEqual({ name: '', params: { id: 26 } })
    })
})