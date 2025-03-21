const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

// 定义需要替换的标题映射
const titleMappings = {
  // 第一类标题替换
  "### 1. 根据流程图讲一遍这个论文提出模型的流程": "### 1. 模型架构与工作流程",
  "### 1. 根据流程图讲一遍论文提出的模型的流程": "### 1. 模型架构与工作流程",
  "### 1. 根据流程图讲一遍这个系统的流程": "### 1. 系统架构与工作流程",
  "### **1. 根据流程图讲一遍论文提出的模型的流程**": "### **1. 模型架构与工作流程**",
  
  // 第二类标题替换
  "### 2. 输入与输出总结": "### 2. 输入数据与输出结果",
  "### **2. 输入与输出总结**": "### **2. 输入数据与输出结果**",
  "### 2. **输入与输出总结**": "### 2. **输入数据与输出结果**",
  "### 2. 总结其输入输出": "### 2. 输入数据与输出结果",
  
  // 第三类标题替换
  "### 3. 技术亮点与不足": "### 3. 核心技术分析",
  "### **3. 技术亮点与不足**": "### **3. 核心技术分析**",
  "### 3. **技术亮点与不足**": "### 3. **核心技术分析**",
  "#### **3. 技术亮点与不足**": "#### **3. 核心技术分析**",
  
  // 其他可能需要替换的子标题
  "#### 技术亮点：": "#### 主要优势：",
  "#### 技术亮点": "#### 主要优势",
  "#### **技术亮点**：": "#### **主要优势**：",
  "#### 技术不足：": "#### 局限性：",
  "#### 技术不足": "#### 局限性",
  "#### **技术不足**：": "#### **局限性**：",
  
  "#### 输入：": "#### 输入数据：",
  "#### 输入": "#### 输入数据",
  "#### **输入**：": "#### **输入数据**：",
  "#### 输出：": "#### 输出结果：",
  "#### 输出": "#### 输出结果",
  "#### **输出**：": "#### **输出结果**：",
  
  "#### 流程图概述：": "#### 图示概述：",
  "#### 流程图概述": "#### 图示概述",
  "#### **流程图概述**：": "#### **图示概述**：",
  "#### 流程分解：": "#### 关键流程：",
  "#### 流程分解": "#### 关键流程",
  "#### **流程分解**：": "#### **关键流程**："
};

// 查找所有的markdown文件
async function findMarkdownFiles(dir) {
  const allFiles = [];
  
  // 读取目录内容
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);
    
    if (stats.isDirectory()) {
      // 如果是目录，递归处理
      const subDirFiles = await findMarkdownFiles(fullPath);
      allFiles.push(...subDirFiles);
    } else if (stats.isFile() && (item.endsWith('.md') || item.endsWith('.MD'))) {
      // 如果是markdown文件，添加到结果
      allFiles.push(fullPath);
    }
  }
  
  return allFiles;
}

// 更新markdown文件内容
async function updateMarkdownFile(filePath) {
  try {
    // 读取文件内容
    const content = await readFileAsync(filePath, 'utf8');
    
    // 应用所有替换
    let updatedContent = content;
    for (const [oldTitle, newTitle] of Object.entries(titleMappings)) {
      updatedContent = updatedContent.replace(new RegExp(oldTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newTitle);
    }
    
    // 如果内容有变化，写回文件
    if (content !== updatedContent) {
      await writeFileAsync(filePath, updatedContent, 'utf8');
      console.log(`更新文件: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`处理文件 ${filePath} 时出错:`, error);
    return false;
  }
}

// 主函数
async function main() {
  console.log('开始查找markdown文件...');
  
  try {
    // 获取所有markdown文件
    const markdownFiles = await findMarkdownFiles('.');
    console.log(`找到 ${markdownFiles.length} 个markdown文件`);
    
    // 处理每个文件
    let updatedCount = 0;
    for (const file of markdownFiles) {
      const updated = await updateMarkdownFile(file);
      if (updated) {
        updatedCount++;
      }
    }
    
    console.log(`成功更新 ${updatedCount} 个文件`);
  } catch (error) {
    console.error('执行过程中出错:', error);
  }
}

// 执行主函数
main(); 