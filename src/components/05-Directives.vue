<template>
  <div class="demo-container">
    <h2>5️⃣ 指令系统</h2>
    <p class="intro">Vue 提供了丰富的指令来操作 DOM 和绑定数据</p>

    <div class="demo-section">
      <h3>📌 v-if / v-else / v-show - 条件渲染</h3>
      <div class="code-demo">
        <div class="demo-box">
          <button @click="showContent = !showContent">切换显示</button>
          <button @click="type = 'success'">成功</button>
          <button @click="type = 'warning'">警告</button>
          <button @click="type = 'error'">错误</button>
          
          <div v-if="showContent" class="content-box">
            <div v-if="type === 'success'" class="alert success">
              ✓ 操作成功
            </div>
            <div v-else-if="type === 'warning'" class="alert warning">
              ⚠ 警告信息
            </div>
            <div v-else-if="type === 'error'" class="alert error">
              ✗ 错误信息
            </div>
            <div v-else class="alert info">
              ℹ 默认信息
            </div>
          </div>
          
          <div v-show="showContent" class="content-box">
            v-show: 通过 CSS display 控制显示
          </div>
        </div>
        <div class="code-explanation">
          <h4>💡 说明：</h4>
          <ul>
            <li><code>v-if</code> - 条件为真时渲染元素</li>
            <li><code>v-else-if</code> - 多条件判断</li>
            <li><code>v-else</code> - 否则分支</li>
            <li><code>v-show</code> - 通过 CSS 控制显示</li>
            <li>v-if 有更高的切换开销</li>
            <li>v-show 有更高的初始渲染开销</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>📌 v-for - 列表渲染</h3>
      <div class="code-demo">
        <div class="demo-box">
          <h4>数组渲染</h4>
          <div v-for="(item, index) in items" :key="item.id" class="list-item">
            <span>{{ index + 1 }}. {{ item.name }}</span>
            <button @click="removeItem(item.id)">删除</button>
          </div>
          <button @click="addItem">添加项目</button>
          
          <h4 style="margin-top: 1rem;">对象渲染</h4>
          <div v-for="(value, key, index) in userObj" :key="key" class="list-item">
            {{ index }}. {{ key }}: {{ value }}
          </div>
        </div>
        <div class="code-explanation">
          <h4>💡 说明：</h4>
          <ul>
            <li><code>v-for="item in items"</code> - 遍历数组</li>
            <li><code>v-for="(item, index) in items"</code> - 获取索引</li>
            <li><code>v-for="(value, key) in object"</code> - 遍历对象</li>
            <li><code>:key</code> 必须提供，用于优化渲染</li>
            <li>key 应该是唯一且稳定的值</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>📌 v-model - 双向绑定</h3>
      <div class="code-demo">
        <div class="demo-box">
          <div class="form-group">
            <label>文本输入:</label>
            <input v-model="formData.text" placeholder="输入文本..." />
            <p>值: {{ formData.text }}</p>
          </div>
          
          <div class="form-group">
            <label>多行文本:</label>
            <textarea v-model="formData.textarea" rows="3"></textarea>
            <p>值: {{ formData.textarea }}</p>
          </div>
          
          <div class="form-group">
            <label>复选框:</label>
            <input type="checkbox" v-model="formData.checkbox" />
            <p>值: {{ formData.checkbox }}</p>
          </div>
          
          <div class="form-group">
            <label>单选框:</label>
            <label><input type="radio" v-model="formData.radio" value="A" /> A</label>
            <label><input type="radio" v-model="formData.radio" value="B" /> B</label>
            <p>值: {{ formData.radio }}</p>
          </div>
          
          <div class="form-group">
            <label>下拉选择:</label>
            <select v-model="formData.select">
              <option value="">请选择</option>
              <option value="vue">Vue</option>
              <option value="react">React</option>
              <option value="angular">Angular</option>
            </select>
            <p>值: {{ formData.select }}</p>
          </div>
        </div>
        <div class="code-explanation">
          <h4>💡 说明：</h4>
          <ul>
            <li><code>v-model</code> - 双向数据绑定</li>
            <li>适用于表单元素</li>
            <li><code>.lazy</code> - 在 change 事件后更新</li>
            <li><code>.number</code> - 转换为数字</li>
            <li><code>.trim</code> - 去除首尾空格</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>📌 v-bind - 属性绑定</h3>
      <div class="code-demo">
        <div class="demo-box">
          <input v-model="imageUrl" placeholder="输入图片URL..." />
          <input v-model="linkUrl" placeholder="输入链接URL..." />
          
          <div class="bind-demo">
            <img :src="imageUrl || 'https://via.placeholder.com/150'" :alt="imageAlt" />
            <a :href="linkUrl || '#'" target="_blank">{{ linkText }}</a>
          </div>
          
          <div 
            :class="['box', { active: isActive, disabled: isDisabled }]"
            :style="{ backgroundColor: bgColor, color: textColor }"
          >
            动态样式盒子
          </div>
          
          <button @click="isActive = !isActive">切换 Active</button>
          <button @click="isDisabled = !isDisabled">切换 Disabled</button>
          <input type="color" v-model="bgColor" />
          <input type="color" v-model="textColor" />
        </div>
        <div class="code-explanation">
          <h4>💡 说明：</h4>
          <ul>
            <li><code>:src</code> - 绑定属性（v-bind 简写）</li>
            <li><code>:class</code> - 动态绑定 class</li>
            <li><code>:style</code> - 动态绑定样式</li>
            <li>支持对象和数组语法</li>
            <li>可以绑定任何 HTML 属性</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>📌 v-on - 事件监听</h3>
      <div class="code-demo">
        <div class="demo-box">
          <button @click="handleClick">普通点击</button>
          <button @click="handleClickWithParam('参数')">带参数点击</button>
          <button @click="count++">内联表达式</button>
          <p>点击次数: {{ count }}</p>
          
          <input 
            @keyup.enter="handleEnter"
            @keyup.esc="handleEsc"
            placeholder="按 Enter 或 Esc..."
          />
          
          <div 
            @click="handleOuterClick"
            class="click-area"
          >
            外层
            <div @click.stop="handleInnerClick" class="inner-area">
              内层 (阻止冒泡)
            </div>
          </div>
        </div>
        <div class="code-explanation">
          <h4>💡 说明：</h4>
          <ul>
            <li><code>@click</code> - 监听事件（v-on 简写）</li>
            <li><code>.stop</code> - 阻止事件冒泡</li>
            <li><code>.prevent</code> - 阻止默认行为</li>
            <li><code>.enter</code> - 按键修饰符</li>
            <li><code>.once</code> - 只触发一次</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="code-block">
      <h3>📝 核心代码示例</h3>
      <pre><code>&lt;!-- 条件渲染 --&gt;
&lt;div v-if="show"&gt;显示内容&lt;/div&gt;
&lt;div v-show="show"&gt;通过 CSS 控制&lt;/div&gt;

&lt;!-- 列表渲染 --&gt;
&lt;div v-for="(item, index) in items" :key="item.id"&gt;
  {{ index }}: {{ item.name }}
&lt;/div&gt;

&lt;!-- 双向绑定 --&gt;
&lt;input v-model="message" /&gt;
&lt;input v-model.number="age" /&gt;
&lt;input v-model.trim="text" /&gt;

&lt;!-- 属性绑定 --&gt;
&lt;img :src="imageUrl" :alt="imageAlt" /&gt;
&lt;div :class="{ active: isActive }"&gt;&lt;/div&gt;
&lt;div :style="{ color: textColor }"&gt;&lt;/div&gt;

&lt;!-- 事件监听 --&gt;
&lt;button @click="handleClick"&gt;点击&lt;/button&gt;
&lt;button @click.stop="handleClick"&gt;阻止冒泡&lt;/button&gt;
&lt;input @keyup.enter="handleEnter" /&gt;</code></pre>
    </div>

    <div class="tips-box">
      <h3>🎯 最佳实践</h3>
      <ul>
        <li><strong>v-if vs v-show：</strong>频繁切换用 v-show，条件很少改变用 v-if</li>
        <li><strong>v-for key：</strong>始终提供唯一的 key，不要用 index</li>
        <li><strong>v-for 优先级：</strong>不要和 v-if 一起使用</li>
        <li><strong>事件修饰符：</strong>合理使用 .stop、.prevent 等修饰符</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const showContent = ref(true)
const type = ref('success')

const items = ref([
  { id: 1, name: '项目 1' },
  { id: 2, name: '项目 2' },
  { id: 3, name: '项目 3' }
])

let nextId = 4

const addItem = () => {
  items.value.push({ id: nextId++, name: `项目 ${nextId - 1}` })
}

const removeItem = (id) => {
  const index = items.value.findIndex(item => item.id === id)
  if (index > -1) {
    items.value.splice(index, 1)
  }
}

const userObj = reactive({
  name: '张三',
  age: 25,
  job: '开发者'
})

const formData = reactive({
  text: '',
  textarea: '',
  checkbox: false,
  radio: '',
  select: ''
})

const imageUrl = ref('')
const imageAlt = ref('示例图片')
const linkUrl = ref('')
const linkText = ref('点击访问')

const isActive = ref(false)
const isDisabled = ref(false)
const bgColor = ref('#667eea')
const textColor = ref('#ffffff')

const count = ref(0)

const handleClick = () => {
  console.log('按钮被点击')
}

const handleClickWithParam = (param) => {
  console.log('带参数点击:', param)
}

const handleEnter = (e) => {
  console.log('按下 Enter:', e.target.value)
}

const handleEsc = () => {
  console.log('按下 Esc')
}

const handleOuterClick = () => {
  console.log('外层点击')
}

const handleInnerClick = () => {
  console.log('内层点击（已阻止冒泡）')
}
</script>

<style scoped>
.demo-container {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

h2 {
  color: #667eea;
  margin-bottom: 1rem;
  font-size: 2rem;
}

.intro {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.demo-section {
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.demo-section h3 {
  color: #333;
  margin-bottom: 1rem;
}

.code-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 1rem;
}

.demo-box {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.demo-box h4 {
  color: #667eea;
  margin-bottom: 1rem;
}

.demo-box button {
  margin: 0.5rem 0.5rem 0 0;
  padding: 0.6rem 1.2rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.demo-box button:hover {
  background: #5568d3;
  transform: translateY(-2px);
}

.content-box {
  margin-top: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 6px;
}

.alert {
  padding: 1rem;
  border-radius: 6px;
  margin: 0.5rem 0;
}

.alert.success {
  background: #d4edda;
  color: #155724;
  border-left: 4px solid #28a745;
}

.alert.warning {
  background: #fff3cd;
  color: #856404;
  border-left: 4px solid #ffc107;
}

.alert.error {
  background: #f8d7da;
  color: #721c24;
  border-left: 4px solid #dc3545;
}

.alert.info {
  background: #d1ecf1;
  color: #0c5460;
  border-left: 4px solid #17a2b8;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  background: #f8f9fa;
  margin: 0.5rem 0;
  border-radius: 6px;
}

.list-item button {
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  background: #dc3545;
}

.form-group {
  margin: 1rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 6px;
}

.form-group label {
  display: block;
  margin: 0.5rem 0;
  color: #555;
  font-weight: 500;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.6rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #667eea;
}

.form-group p {
  margin-top: 0.5rem;
  color: #667eea;
  font-weight: 500;
}

.bind-demo {
  margin: 1rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 6px;
  text-align: center;
}

.bind-demo img {
  max-width: 150px;
  border-radius: 8px;
  margin: 0.5rem;
}

.bind-demo a {
  display: block;
  margin: 1rem 0;
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.box {
  padding: 1.5rem;
  margin: 1rem 0;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  transition: all 0.3s;
}

.box.active {
  transform: scale(1.1);
  box-shadow: 0 5px 20px rgba(0,0,0,0.2);
}

.box.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.demo-box input[type="color"] {
  margin: 0.5rem;
  width: 60px;
  height: 40px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.click-area {
  margin: 1rem 0;
  padding: 2rem;
  background: #e8f4f8;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
}

.inner-area {
  margin: 1rem auto;
  padding: 1rem;
  background: #667eea;
  color: white;
  border-radius: 6px;
  max-width: 200px;
}

.code-explanation {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.code-explanation h4 {
  color: #667eea;
  margin-bottom: 1rem;
}

.code-explanation ul {
  list-style: none;
  padding: 0;
}

.code-explanation li {
  padding: 0.5rem 0;
  color: #555;
  line-height: 1.6;
}

.code-explanation code {
  background: #f8f9fa;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  color: #667eea;
  font-family: 'Courier New', monospace;
}

.code-block {
  margin: 2rem 0;
  background: #2d3748;
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
}

.code-block h3 {
  color: white;
  margin-bottom: 1rem;
}

.code-block pre {
  margin: 0;
}

.code-block code {
  color: #a0aec0;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
}

.tips-box {
  background: #fff3cd;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #ffc107;
  margin-top: 2rem;
}

.tips-box h3 {
  color: #856404;
  margin-bottom: 1rem;
}

.tips-box ul {
  list-style: none;
  padding: 0;
}

.tips-box li {
  padding: 0.5rem 0;
  color: #856404;
}

.tips-box strong {
  color: #533f03;
}

@media (max-width: 768px) {
  .code-demo {
    grid-template-columns: 1fr;
  }
}
</style>
