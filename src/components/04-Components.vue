<template>
  <div class="demo-container">
    <h2>4️⃣ 组件通信</h2>
    <p class="intro">Vue 提供多种方式实现父子组件、兄弟组件之间的通信</p>

    <div class="demo-section">
      <h3>📌 Props - 父传子</h3>
      <div class="code-demo">
        <div class="demo-box">
          <h4>父组件</h4>
          <input v-model="parentMessage" placeholder="输入消息..." />
          <input type="number" v-model.number="parentCount" />
          <UserCard 
            :username="parentMessage" 
            :count="parentCount"
            :user-info="userInfo"
          />
        </div>
        <div class="code-explanation">
          <h4>💡 说明：</h4>
          <ul>
            <li>使用 <code>defineProps</code> 接收 props</li>
            <li>Props 是单向数据流（父→子）</li>
            <li>子组件不应修改 props</li>
            <li>支持类型验证和默认值</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>📌 Emit - 子传父</h3>
      <div class="code-demo">
        <div class="demo-box">
          <h4>父组件接收事件</h4>
          <p>子组件发送的消息: <strong>{{ childMessage }}</strong></p>
          <p>点击次数: <strong>{{ clickCount }}</strong></p>
          <ChildEmitter 
            @send-message="handleMessage"
            @increment="handleIncrement"
          />
        </div>
        <div class="code-explanation">
          <h4>💡 说明：</h4>
          <ul>
            <li>使用 <code>defineEmits</code> 定义事件</li>
            <li>子组件通过 emit 触发事件</li>
            <li>父组件通过 @ 监听事件</li>
            <li>可以传递参数</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>📌 v-model - 双向绑定</h3>
      <div class="code-demo">
        <div class="demo-box">
          <h4>父组件</h4>
          <p>输入值: <strong>{{ inputValue }}</strong></p>
          <CustomInput v-model="inputValue" />
          <CustomInput v-model="inputValue" placeholder="另一个输入框" />
        </div>
        <div class="code-explanation">
          <h4>💡 说明：</h4>
          <ul>
            <li>v-model 是 props + emit 的语法糖</li>
            <li>等价于 <code>:modelValue</code> + <code>@update:modelValue</code></li>
            <li>实现父子组件数据同步</li>
            <li>可以自定义多个 v-model</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>📌 Provide / Inject - 跨层级通信</h3>
      <div class="code-demo">
        <div class="demo-box">
          <h4>祖先组件提供数据</h4>
          <input v-model="themeColor" placeholder="输入颜色..." />
          <GrandChild />
        </div>
        <div class="code-explanation">
          <h4>💡 说明：</h4>
          <ul>
            <li><code>provide</code> 提供数据</li>
            <li><code>inject</code> 注入数据</li>
            <li>跨越多层组件传递数据</li>
            <li>避免 props 逐层传递</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="code-block">
      <h3>📝 核心代码示例</h3>
      <pre><code>// 1. Props - 父传子
// 子组件
const props = defineProps({
  username: String,
  count: {
    type: Number,
    default: 0
  }
})

// 父组件
&lt;ChildComponent :username="name" :count="10" /&gt;

// 2. Emit - 子传父
// 子组件
const emit = defineEmits(['sendMessage', 'increment'])
emit('sendMessage', 'Hello')
emit('increment', 1)

// 父组件
&lt;ChildComponent 
  @send-message="handleMessage"
  @increment="handleIncrement"
/&gt;

// 3. v-model - 双向绑定
// 子组件
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
emit('update:modelValue', newValue)

// 父组件
&lt;CustomInput v-model="value" /&gt;

// 4. Provide / Inject - 跨层级
// 祖先组件
provide('theme', themeColor)

// 后代组件
const theme = inject('theme')</code></pre>
    </div>

    <div class="tips-box">
      <h3>🎯 最佳实践</h3>
      <ul>
        <li><strong>Props：</strong>父传子，单向数据流</li>
        <li><strong>Emit：</strong>子传父，触发事件</li>
        <li><strong>v-model：</strong>双向绑定，表单组件</li>
        <li><strong>Provide/Inject：</strong>跨层级，插件、主题等</li>
        <li><strong>Pinia：</strong>复杂状态管理，全局共享</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, provide, defineComponent } from 'vue'

const parentMessage = ref('Hello Vue3')
const parentCount = ref(10)
const userInfo = ref({
  name: '张三',
  role: '开发者'
})

const childMessage = ref('')
const clickCount = ref(0)

const handleMessage = (msg) => {
  childMessage.value = msg
  console.log('接收到子组件消息:', msg)
}

const handleIncrement = (num) => {
  clickCount.value += num
  console.log('点击次数增加:', num)
}

const inputValue = ref('')

const themeColor = ref('#667eea')
provide('themeColor', themeColor)
</script>

<script>
import { defineComponent, inject } from 'vue'

const UserCard = defineComponent({
  name: 'UserCard',
  props: {
    username: {
      type: String,
      default: '匿名用户'
    },
    count: {
      type: Number,
      default: 0
    },
    userInfo: {
      type: Object,
      default: () => ({})
    }
  },
  template: `
    <div class="user-card">
      <h5>子组件接收到的 Props:</h5>
      <p>用户名: {{ username }}</p>
      <p>计数: {{ count }}</p>
      <p>信息: {{ userInfo.name }} - {{ userInfo.role }}</p>
    </div>
  `
})

const ChildEmitter = defineComponent({
  name: 'ChildEmitter',
  emits: ['sendMessage', 'increment'],
  setup(props, { emit }) {
    const sendMsg = () => {
      emit('sendMessage', '来自子组件的消息 ' + new Date().toLocaleTimeString())
    }
    
    const incrementCount = () => {
      emit('increment', 1)
    }
    
    return { sendMsg, incrementCount }
  },
  template: `
    <div class="child-emitter">
      <h5>子组件触发事件:</h5>
      <button @click="sendMsg">发送消息</button>
      <button @click="incrementCount">增加计数</button>
    </div>
  `
})

const CustomInput = defineComponent({
  name: 'CustomInput',
  props: {
    modelValue: String,
    placeholder: {
      type: String,
      default: '请输入...'
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const updateValue = (e) => {
      emit('update:modelValue', e.target.value)
    }
    
    return { updateValue }
  },
  template: `
    <div class="custom-input">
      <input 
        :value="modelValue" 
        @input="updateValue"
        :placeholder="placeholder"
      />
    </div>
  `
})

const GrandChild = defineComponent({
  name: 'GrandChild',
  setup() {
    const themeColor = inject('themeColor')
    
    return { themeColor }
  },
  template: `
    <div class="grand-child" :style="{ borderColor: themeColor }">
      <h5>孙组件</h5>
      <p>通过 inject 获取的主题色: <span :style="{ color: themeColor }">{{ themeColor }}</span></p>
    </div>
  `
})

export default {
  components: {
    UserCard,
    ChildEmitter,
    CustomInput,
    GrandChild
  }
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

.demo-box p {
  margin: 0.5rem 0;
  color: #555;
}

.demo-box strong {
  color: #667eea;
  font-size: 1.2rem;
}

.demo-box input {
  width: 100%;
  padding: 0.6rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  margin: 0.5rem 0;
  font-size: 1rem;
}

.demo-box input:focus {
  outline: none;
  border-color: #667eea;
}

.user-card,
.child-emitter,
.custom-input,
.grand-child {
  margin-top: 1rem;
  padding: 1rem;
  background: #e8f4f8;
  border-radius: 6px;
  border-left: 4px solid #667eea;
}

.user-card h5,
.child-emitter h5,
.grand-child h5 {
  color: #667eea;
  margin-bottom: 0.5rem;
}

.user-card p,
.grand-child p {
  margin: 0.3rem 0;
  color: #555;
}

.child-emitter button,
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

.child-emitter button:hover,
.demo-box button:hover {
  background: #5568d3;
  transform: translateY(-2px);
}

.custom-input input {
  width: 100%;
  padding: 0.6rem;
  border: 2px solid #667eea;
  border-radius: 6px;
  font-size: 1rem;
}

.grand-child {
  border: 3px solid;
  transition: border-color 0.3s;
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
