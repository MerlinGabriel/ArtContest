#!/bin/bash

echo "🚀 开始部署 ArtContest 链上艺术评选平台..."

# 检查是否在正确的目录
if [ ! -d "artcontest-hardhat" ] || [ ! -d "artcontest-frontend" ]; then
    echo "❌ 请在 action 目录下运行此脚本"
    exit 1
fi

# 部署合约到 Sepolia 测试网
echo "📝 1. 部署智能合约到 Sepolia 测试网..."
cd artcontest-hardhat

# 检查环境变量文件
if [ ! -f ".env" ]; then
    echo "⚠️  未检测到 .env 文件。请创建 .env 并设置以下变量："
    echo "    PRIVATE_KEY=你的私钥"
    echo "    SEPOLIA_RPC_URL=你的Sepolia RPC地址"
    echo "    ETHERSCAN_API_KEY=你的Etherscan API Key"
    echo "    （出于安全考虑，本脚本不再写入任何敏感值）"
    exit 1
fi

echo "📦 安装合约依赖..."
npm install

echo "🔨 编译合约..."
npx hardhat compile

echo "🌐 部署合约到 Sepolia..."
if [ -z "$PRIVATE_KEY" ] || [ -z "$SEPOLIA_RPC_URL" ] || [ -z "$ETHERSCAN_API_KEY" ]; then
    echo "❌ 环境变量不完整：请在 .env 中配置 PRIVATE_KEY / SEPOLIA_RPC_URL / ETHERSCAN_API_KEY"
    exit 1
fi

npx hardhat deploy --network sepolia --tags ArtContest

if [ $? -ne 0 ]; then
    echo "❌ 合约部署失败"
    exit 1
fi

echo "✅ 合约部署成功！"

# 部署前端
echo ""
echo "🎨 2. 准备前端应用..."
cd ../artcontest-frontend

echo "📦 安装前端依赖..."
npm install

echo "🔧 生成 ABI 文件..."
npm run genabi

if [ $? -ne 0 ]; then
    echo "❌ ABI 生成失败"
    exit 1
fi

echo "✅ ABI 文件生成成功！"

echo ""
echo "🎉 部署完成！"
echo ""
echo "📋 接下来的步骤："
echo "1. 启动前端: cd artcontest-frontend && npm run dev:sepolia"
echo "2. 在 MetaMask 中切换到 Sepolia 测试网"
echo "3. 访问 http://localhost:3000"
echo ""
echo "🔗 合约信息："
if [ -f "../artcontest-hardhat/deployments/sepolia/ArtContest.json" ]; then
    CONTRACT_ADDRESS=$(node -e "console.log(require('../artcontest-hardhat/deployments/sepolia/ArtContest.json').address)")
    echo "合约地址: $CONTRACT_ADDRESS"
    echo "Etherscan: https://sepolia.etherscan.io/address/$CONTRACT_ADDRESS"
fi

echo ""
echo "🎨 开始你的链上艺术评选之旅！"
