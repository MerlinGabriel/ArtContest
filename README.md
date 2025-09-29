# ArtContest - 链上艺术评选平台

基于 FHEVM 同态加密的去中心化艺术作品评选竞赛平台。

## 🏆 项目特色

- **公平竞赛**：艺术家匿名提交作品参与评选
- **隐私投票**：评委投票和评分通过 FHE 加密保护
- **透明排名**：基于区块链的公开透明评选机制
- **多轮评选**：支持初选、复赛、决赛多轮竞赛
- **不可操控**：所有评选数据上链，防止人为操控

## 🏗️ 技术架构

### 后端（智能合约）
- **Solidity 0.8.27** + **FHEVM 0.8**
- **Hardhat** 开发框架
- **FHE 库**：使用 `euint32` 加密存储评分和投票
- **ACL 权限控制**：`FHE.allow/allowThis/allowTransient`

### 前端
- **Next.js 15** + **React 19** + **TypeScript**
- **Tailwind CSS**：现代化竞赛风格 UI 设计
- **@zama-fhe/relayer-sdk**：Sepolia 测试网 FHEVM 集成

## 🚀 部署到 Sepolia 测试网

### 前置要求
- Node.js >= 20
- npm >= 7.0.0
- MetaMask 浏览器扩展

### 1. 配置环境变量

在 `artcontest-hardhat` 目录创建 `.env`：

```bash
# 切勿提交真实密钥到仓库！以下为占位示例
PRIVATE_KEY=YOUR_PRIVATE_KEY
SEPOLIA_RPC_URL=YOUR_SEPOLIA_RPC_URL
ETHERSCAN_API_KEY=YOUR_ETHERSCAN_API_KEY
```

> 安全提示：请使用环境变量或密钥管理工具，避免在脚本、文档中明文写入任何真实密钥。

### 2. 编译与部署合约

```bash
cd artcontest-hardhat
npm install
npx hardhat compile
npm run deploy:sepolia
```

### 3. 启动前端

```bash
cd artcontest-frontend
npm install
npm run genabi
npm run dev:sepolia
```

### 4. 配置 MetaMask

1. 打开 MetaMask 扩展
2. 添加 Sepolia 测试网络（如果没有）
3. 切换到 Sepolia 网络
4. 确保账户有测试 ETH

### 5. 访问应用

打开浏览器访问：http://localhost:3000

## 📱 功能使用

### 🎨 提交参赛作品
1. 点击 "🚀 提交作品"
2. 填写参赛信息：
   - **作品标题**：参赛作品名称
   - **作品描述哈希**：IPFS 描述文件哈希
   - **作品文件哈希**：IPFS 作品文件哈希
   - **创作标签**：用逗号分隔的创作标签
   - **参赛类别**：选择参赛类别（可多选）
3. 点击 "✨ 确认提交"
4. MetaMask 签名确认

### ⭐ 评分作品
1. 在评选大厅浏览参赛作品
2. 点击 "⭐ 评分" 按钮
3. MetaMask 签名确认
4. 按钮变为 "✅ 已评分"（金色，不可再次评分）

### 🗳️ 类别投票
1. 查看作品的参赛类别标签
2. 点击对应类别的投票按钮
3. MetaMask 签名确认
4. 按钮变为 "✅ 已投票"（蓝色，不可再次投票）

### 🔓 查看评分
1. 点击 "🔓 查看评分" 查看评分明文
2. 在排行榜页面点击 "🔓 显示所有票数"
3. 需要 EIP-712 签名授权解密

### 🏆 查看排行榜
1. 点击 "🏆 竞赛排行"
2. 选择类别（绘画/摄影/数字艺术/雕塑）
3. 只显示该类别的参赛作品
4. 解密后按票数排序

## 🔧 开发说明

### 合约结构
```solidity
struct ContestEntry {
    uint256 id;
    address contestant;
    string title;
    string descriptionHash;
    string fileHash;
    string[] tags;
    string[] categories;
    euint32 scoresEnc;      // FHE 加密的评分
    uint64 timestamp;
}
```

### 关键特性
- **FHE 加密评分**：`euint32` 类型存储评分和投票数
- **ACL 权限管理**：合约、参赛者、评委的解密权限
- **类别验证**：只能对作品所属类别投票
- **Relayer SDK**：生产环境 FHEVM 集成

## 🐛 常见问题

### FHEVM 初始化失败
- 确保连接到 Sepolia 测试网
- 检查网络连接和第三方脚本加载
- 清除浏览器缓存重试

### 合约调用失败
- 确保合约已正确部署到 Sepolia
- 检查 ABI 是否为最新版本
- 查看浏览器 Console 的错误信息

### MetaMask 连接问题
- 确保选择了 Sepolia 测试网
- 确保账户有足够的测试 ETH
- 重新连接钱包

## 📄 许可证

BSD-3-Clause-Clear

---

**开启你的链上艺术评选之旅！** 🎨🏆
