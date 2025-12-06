# GitHub 提交代码配置指南

## 问题说明
GitHub 已不再支持密码认证，需要使用 Personal Access Token (PAT) 或 SSH 密钥。

## 解决方案

### 方案一：使用 Personal Access Token (推荐)

#### 1. 创建 Personal Access Token
1. 登录 GitHub
2. 点击右上角头像 → **Settings**
3. 左侧菜单选择 **Developer settings**
4. 选择 **Personal access tokens** → **Tokens (classic)**
5. 点击 **Generate new token** → **Generate new token (classic)**
6. 填写信息：
   - **Note**: 填写描述，如 "cursor_vue project"
   - **Expiration**: 选择过期时间（建议选择较长时间）
   - **Select scopes**: 至少勾选 `repo`（完整仓库访问权限）
7. 点击 **Generate token**
8. **重要**：复制生成的 token（只显示一次，请妥善保存）

#### 2. 使用 Token 推送代码

**方法 A：在 URL 中使用 Token**
```bash
git remote set-url origin https://YOUR_TOKEN@github.com/YUECHUNYING/cursor_vue.git
```

**方法 B：使用 Git Credential Helper（推荐）**
```bash
# 推送时会提示输入用户名和密码
# 用户名：你的 GitHub 用户名
# 密码：粘贴你的 Personal Access Token
git push -u origin master
```

**方法 C：在 URL 中嵌入用户名和 Token**
```bash
git remote set-url origin https://YOUR_USERNAME:YOUR_TOKEN@github.com/YUECHUNYING/cursor_vue.git
```

### 方案二：使用 SSH 密钥（更安全，推荐长期使用）

#### 1. 检查是否已有 SSH 密钥
```bash
ls -al ~/.ssh
```

#### 2. 生成新的 SSH 密钥（如果没有）
```bash
ssh-keygen -t ed25519 -C "961703455@qq.com"
# 按回车使用默认路径
# 可以设置密码或直接回车
```

#### 3. 添加 SSH 密钥到 ssh-agent
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

#### 4. 复制公钥
```bash
cat ~/.ssh/id_ed25519.pub
# 复制输出的内容
```

#### 5. 在 GitHub 添加 SSH 密钥
1. GitHub → Settings → SSH and GPG keys
2. 点击 **New SSH key**
3. **Title**: 填写描述
4. **Key**: 粘贴刚才复制的公钥
5. 点击 **Add SSH key**

#### 6. 修改远程仓库地址为 SSH
```bash
git remote set-url origin git@github.com:YUECHUNYING/cursor_vue.git
```

#### 7. 测试连接
```bash
ssh -T git@github.com
# 应该看到：Hi YUECHUNYING! You've successfully authenticated...
```

### 方案三：配置代理（如果网络不稳定）

如果在中国大陆，可能需要配置代理：

```bash
# 设置 HTTP 代理
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890

# 取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy
```

## 快速解决步骤（推荐）

### 使用 Personal Access Token 快速解决：

1. **创建 Token**（按照方案一的步骤 1）

2. **清除旧的凭证**：
```bash
git credential reject <<EOF
protocol=https
host=github.com
EOF
```

3. **推送代码**（会提示输入用户名和密码）：
```bash
git push -u origin master
# Username: YUECHUNYING
# Password: <粘贴你的 Personal Access Token>
```

4. **保存凭证**（可选，避免每次都输入）：
```bash
git config --global credential.helper store
```

## 验证配置

```bash
# 检查远程仓库地址
git remote -v

# 测试推送（如果有未推送的提交）
git push -u origin master
```

## 常见问题

### Q: Token 在哪里查看？
A: Token 创建后只显示一次，如果忘记了需要重新创建。

### Q: 使用 Token 后还需要输入密码吗？
A: 不需要，Token 就是你的密码。

### Q: SSH 和 HTTPS 哪个更好？
A: SSH 更安全且方便，推荐长期使用。HTTPS + Token 适合临时使用。

