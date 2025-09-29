#!/bin/bash

echo "🏆 启动 ArtContest 链上艺术评选平台..."

# 检查是否在正确的目录
if [ ! -d "artcontest-frontend" ]; then
    echo "❌ 请在 action 目录下运行此脚本"
    exit 1
fi

# 检查是否已经部署合约
if [ ! -f "artcontest-hardhat/deployments/sepolia/ArtContest.json" ]; then
    echo "⚠️  未找到 Sepolia 合约部署文件"
    echo "请先运行: ./deploy.sh"
    exit 1
fi

cd artcontest-frontend

# 检查依赖是否安装
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖..."
    npm install
fi

# 生成最新的 ABI
echo "🔧 生成 ABI..."
npm run genabi

# 启动前端
echo "🚀 启动前端应用..."
echo ""
echo "📋 使用说明："
echo "1. 确保 MetaMask 已连接到 Sepolia 测试网"
echo "2. 确保账户有足够的测试 ETH"
echo "3. 访问 http://localhost:3000"
echo ""

npm run dev:sepolia
