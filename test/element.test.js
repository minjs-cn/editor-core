var { Element } = require('../lib')

var assert = require('assert')

describe('Element类测试', function() {
  var option = {
    name: 'title1'
  }

  var result = new Element(option)

  it(`new Element(${JSON.stringify(option)})`, function() {
    assert.equal(result.name, option.name)
    assert.equal(result.id, 1)
  })

  it(`new Element().addChild`, function() {
    var c1 = new Element(option)
    result.addChild(c1)

    assert.equal(result.size, 1)
    assert.equal(result.elements[0].name, option.name)
  })

  it(`new Element().removeChild`, function() {
    var c2 = new Element({
      ...option,
      name: 'title2'
    })
    option.name = 'title3'
    var c3 = new Element({
      ...option,
      name: 'title3'
    })
    result.addChild(c2)
    result.addChild(c3)

    assert.equal(result.size, 3)

    result.removeChild(c2)

    assert.equal(result.size, 2)

    result.removeChild(new Element(c3))

    assert.equal(result.size, 1)
    assert.equal(result.elements[0].name, 'title1')
  })

  it(`new Element().clone`, function() {
    var ele = result.clone()

    assert.equal(ele.size, result.size)
    assert.notEqual(ele.elements, result.elements)
  })

})
