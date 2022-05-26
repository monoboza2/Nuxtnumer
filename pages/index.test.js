import { mount } from '@vue/test-utils'
import index from './index.vue'

describe('index page', () => {
  const wrapper = mount(index)
  describe('app title', () => {
    const element = wrapper.find('.name')
    it('displays app title', () => {
      expect(element.text()).toEqual('Nuxt_Numer')
    })
  })
})
