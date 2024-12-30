import { mount } from '@vue/test-utils'
import NavBarExtension from './NavBarExtension.vue'
import { useNavbar } from '@/composables/use-navbar'

describe('NavBarExtension', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(NavBarExtension, {
      slots: {
        default: '<div>Test Content</div>',
      },
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('should set the initial offset correctly when component is pre-attached', async () => {
    const { state, setState } = useNavbar()
    setState({ extensionAttached: true })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.initialOffset).toBe(wrapper.vm.stickyWrapper.offsetTop + wrapper.vm.navbarHeight)
  })

  it('should calculate the trigger point correctly based on initial offset and navbar height', async () => {
    const { state, setState } = useNavbar()
    setState({ extensionAttached: false })

    await wrapper.vm.$nextTick()

    const triggerPoint = wrapper.vm.initialOffset - wrapper.vm.navbarHeight
    expect(wrapper.vm.isSticky).toBe(window.scrollY >= triggerPoint)
  })

  it('should handle scroll event and update isSticky state correctly', async () => {
    const { state, setState } = useNavbar()
    setState({ extensionAttached: false })

    await wrapper.vm.$nextTick()

    window.scrollY = wrapper.vm.initialOffset - wrapper.vm.navbarHeight
    window.dispatchEvent(new Event('scroll'))

    expect(wrapper.vm.isSticky).toBe(true)
  })
})
