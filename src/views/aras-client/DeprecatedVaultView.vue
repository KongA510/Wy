<template>
  <article class="doc-content">
    <h1>Vault（已弃用）</h1>
    <blockquote>
      <p><strong>命名空间：</strong><code>Aras.Client.Controls.Public</code></p>
      <p><code>aras.vault</code> 类实例可用于自定义 JavaScript 代码中。Vault 提供批量文件上传/下载功能以及相关的文件操作例程。</p>
    </blockquote>

    <h2>说明</h2>
    <p>Vault 提供用户友好的界面，在耗时的上传/下载过程中显示进度条，并具备警告/错误消息系统以通知用户任何冲突。用户可以添加/删除批处理列表中的文件、重命名文件和文件夹、取消当前任务。</p>
    <p>用户可以从本地和网络映射文件夹中选择文件，可选择包含所有子文件夹。此外，还可以输入任何有效的网络路径并在文件选择对话框中浏览该路径。</p>
    <p>文件传输支持 HTTP、SSL (HTTPS)，可以使用或不使用代理。这是通过使用浏览器的原生连接类实现的。最吸引人的特性是能够上传超大文件（无文件大小限制），无超时或内存泄漏问题。传输将使用所有可用的网络带宽，速度与您的局域网/广域网环境匹配。</p>
    <p>您可以随文件一起提交表单数据，通常用于将状态信息发送回服务器。您可以基于应用程序逻辑控制、过滤和预处理用户选择的文件列表，启用或禁用特定文件类型的传输，并收集与这些文件相关的附加信息。无需重新加载页面即可传输文件。使用标准的 "multipart/form-data" 内容编码，因此该组件与任何服务器端上传组件兼容。</p>

    <h2>API 成员概览</h2>
    <table>
      <thead>
        <tr>
          <th>成员</th>
          <th>类型</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>#ctor</code></td>
          <td>公有构造函数</td>
          <td>Vault 构造函数</td>
        </tr>
        <tr>
          <td><code>setClientData</code></td>
          <td>公有方法</td>
          <td>设置上传用的用户数据（表单字段），上传模式</td>
        </tr>
        <tr>
          <td><code>getClientData</code></td>
          <td>公有方法</td>
          <td>获取上传用的用户数据（表单字段）</td>
        </tr>
        <tr>
          <td><code>selectFile</code></td>
          <td>公有方法</td>
          <td>显示文件选择对话框，允许用户浏览本地文件系统并选择文件</td>
        </tr>
        <tr>
          <td><code>addFileToList</code></td>
          <td>公有方法</td>
          <td>将指定的文件 URL 添加到文件列表中</td>
        </tr>
        <tr>
          <td><code>sendFilesAsync</code></td>
          <td>公有方法</td>
          <td>以异步模式将文件从客户端数据发送到指定 URL</td>
        </tr>
        <tr>
          <td><code>getResponse</code></td>
          <td>公有方法</td>
          <td>返回服务器响应的数据</td>
        </tr>
        <tr>
          <td><code>getLastError</code></td>
          <td>公有方法</td>
          <td>获取最后一次操作的错误消息</td>
        </tr>
        <tr>
          <td><code>clearClientData</code></td>
          <td>公有方法</td>
          <td>清除所有用户数据值</td>
        </tr>
        <tr>
          <td><code>clearFileList</code></td>
          <td>公有方法</td>
          <td>清除文件列表</td>
        </tr>
        <tr>
          <td><code>setLocalFileName</code></td>
          <td>公有方法</td>
          <td>设置本地文件名</td>
        </tr>
        <tr>
          <td><code>downloadFile</code></td>
          <td>公有方法</td>
          <td>从指定 URL 下载文件到工作目录</td>
        </tr>
        <tr>
          <td><code>readText</code></td>
          <td>公有方法</td>
          <td>从当前流位置读取到流末尾的文本</td>
        </tr>
        <tr>
          <td><code>readBase64</code></td>
          <td>公有方法</td>
          <td>从指定偏移量读取 Base64 编码字节</td>
        </tr>
      </tbody>
    </table>

    <h2>API 详情</h2>

    <!-- ===== 构造函数 ===== -->
    <h3>constructor()</h3>
    <p>Vault 类的构造函数。</p>
    <h4>签名</h4>
    <pre v-pre><code class="language-javascript">Aras.Client.Controls.Public.Vault = function();</code></pre>
    <h4>参数</h4>
    <p><em>无</em></p>
    <h4>返回值</h4>
    <p><em>无</em></p>
    <h4>示例</h4>
    <pre v-pre><code class="language-javascript">// 通过 aras 全局对象获取 vault 实例
var vault = aras.vault;

// 通常不需要手动 new，aras.vault 已经是实例化好的对象
// 如需新建实例：
// var vault = new Aras.Client.Controls.Public.Vault();</code></pre>

    <hr />

    <!-- ===== 文件选择与列表管理 ===== -->
    <h3>文件选择与列表管理</h3>

    <h3>selectFile()</h3>
    <p>显示文件选择对话框，允许用户浏览本地文件系统并选择文件。如果用户浏览到某个目录，该目录也会被设置为 Vault 的工作目录。对话框的初始工作目录为 Vault 的当前工作目录。</p>
    <h4>参数</h4>
    <p><em>无</em></p>
    <h4>返回值</h4>
    <p><strong>Promise&lt;Object&gt;</strong> — 返回一个 Promise 对象，如果用户选择了文件，该 Promise 将被 resolve 为选中的文件对象。</p>
    <h4>示例</h4>
    <pre v-pre><code class="language-javascript">// 弹出文件选择对话框，等待用户选择文件
aras.vault.selectFile().then(function(selectedFile) {
    if (selectedFile) {
        console.log('用户选择了文件:', selectedFile);
        // 通常接下来会将文件添加到列表并上传
        aras.vault.addFileToList(selectedFile.fileID, selectedFile.filename);
    }
});</code></pre>

    <h3>addFileToList()</h3>
    <p>将指定的文件 URL 添加到文件列表中。在上传之前，需要先将文件添加到列表。</p>
    <h4>参数</h4>
    <table>
      <thead>
        <tr>
          <th>参数</th>
          <th>类型</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>fileID</code></td>
          <td><code>string</code></td>
          <td>文件的唯一标识符</td>
        </tr>
        <tr>
          <td><code>filename</code></td>
          <td><code>string</code></td>
          <td>文件名（含路径）</td>
        </tr>
      </tbody>
    </table>
    <h4>返回值</h4>
    <p><strong>bool</strong> — 添加成功返回 <code>true</code>，否则返回 <code>false</code>。</p>
    <h4>示例</h4>
    <pre v-pre><code class="language-javascript">// 将文件添加到上传列表
var added = aras.vault.addFileToList('file_001', 'C:\\Users\\admin\\Documents\\report.pdf');
if (added) {
    console.log('文件已添加到上传列表');
} else {
    console.log('文件添加失败');
}</code></pre>

    <h3>clearFileList()</h3>
    <p>清空当前的文件列表。</p>
    <h4>参数</h4>
    <p><em>无</em></p>
    <h4>返回值</h4>
    <p><em>无</em></p>
    <h4>示例</h4>
    <pre v-pre><code class="language-javascript">// 清空文件列表，取消所有待上传文件
aras.vault.clearFileList();</code></pre>

    <h3>setLocalFileName()</h3>
    <p>设置本地文件名。</p>
    <h4>参数</h4>
    <table>
      <thead>
        <tr>
          <th>参数</th>
          <th>类型</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>filename</code></td>
          <td><code>string</code></td>
          <td>要设置的本地文件名</td>
        </tr>
      </tbody>
    </table>
    <h4>返回值</h4>
    <p><em>无</em></p>
    <h4>示例</h4>
    <pre v-pre><code class="language-javascript">// 设置下载时的本地文件名
aras.vault.setLocalFileName('downloaded_report.pdf');</code></pre>

    <hr />

    <!-- ===== 客户端数据管理 ===== -->
    <h3>客户端数据管理</h3>

    <h3>setClientData()</h3>
    <p>设置上传用的用户数据（表单字段），用于上传模式下随文件一起发送额外的表单参数。</p>
    <h4>参数</h4>
    <table>
      <thead>
        <tr>
          <th>参数</th>
          <th>类型</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>name</code></td>
          <td><code>string</code></td>
          <td>表单字段名称</td>
        </tr>
        <tr>
          <td><code>value_Renamed</code></td>
          <td><code>string</code></td>
          <td>表单字段的值</td>
        </tr>
      </tbody>
    </table>
    <h4>返回值</h4>
    <p><em>无</em></p>
    <h4>示例</h4>
    <pre v-pre><code class="language-javascript">// 设置随文件一起发送的表单数据
aras.vault.setClientData('itemType', 'Document');
aras.vault.setClientData('itemId', 'A1B2C3D4E5F6');
aras.vault.setClientData('action', 'upload');
// 这些数据会以 multipart/form-data 格式随文件一起发送</code></pre>

    <h3>getClientData()</h3>
    <p>获取上传用的用户数据（表单字段）的值。</p>
    <h4>参数</h4>
    <table>
      <thead>
        <tr>
          <th>参数</th>
          <th>类型</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>name</code></td>
          <td><code>string</code></td>
          <td>要获取的表单字段名称</td>
        </tr>
      </tbody>
    </table>
    <h4>返回值</h4>
    <p><strong>string</strong> — 对应字段名称的值。</p>
    <h4>示例</h4>
    <pre v-pre><code class="language-javascript">// 获取之前设置的客户端数据
var itemType = aras.vault.getClientData('itemType');
console.log(itemType); // 'Document'</code></pre>

    <h3>clearClientData()</h3>
    <p>清除所有已设置的用户数据值。</p>
    <h4>参数</h4>
    <p><em>无</em></p>
    <h4>返回值</h4>
    <p><em>无</em></p>
    <h4>示例</h4>
    <pre v-pre><code class="language-javascript">// 清除所有客户端数据
aras.vault.clearClientData();</code></pre>

    <hr />

    <!-- ===== 文件传输 ===== -->
    <h3>文件传输</h3>

    <h3>sendFilesAsync()</h3>
    <p>以异步模式将文件从客户端数据（包括文件列表和表单字段）发送到指定的服务器 URL。传输过程会显示进度条，用户可随时取消。</p>
    <h4>参数</h4>
    <table>
      <thead>
        <tr>
          <th>参数</th>
          <th>类型</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>serverUrl</code></td>
          <td><code>string</code></td>
          <td>接收文件上传的服务器端 URL</td>
        </tr>
      </tbody>
    </table>
    <h4>返回值</h4>
    <p><strong>Promise&lt;Object&gt;</strong> — 返回一个 Promise 对象，用于处理上传完成或失败的回调。</p>
    <h4>示例</h4>
    <pre v-pre><code class="language-javascript">// 完整的上传流程示例
async function uploadFiles() {
    // 1. 设置客户端数据
    aras.vault.clearClientData();
    aras.vault.setClientData('itemType', 'Document');
    aras.vault.setClientData('itemId', 'A1B2C3D4E5F6');

    // 2. 选择文件并添加到列表
    try {
        var file = await aras.vault.selectFile();
        if (file) {
            aras.vault.addFileToList(file.fileID, file.filename);
        } else {
            console.log('用户取消了文件选择');
            return;
        }
    } catch (err) {
        console.error('文件选择失败:', err);
        return;
    }

    // 3. 异步发送文件
    try {
        var response = await aras.vault.sendFilesAsync('/server/upload.aspx');
        console.log('上传成功，服务器响应:', response);
    } catch (err) {
        var errorMsg = aras.vault.getLastError();
        console.error('上传失败:', errorMsg);
    }
}

uploadFiles();</code></pre>

    <h3>downloadFile()</h3>
    <p>从指定的文件 URL 下载文件到 Vault 的工作目录。支持带凭据和 POST 数据的下载。</p>
    <h4>参数</h4>
    <table>
      <thead>
        <tr>
          <th>参数</th>
          <th>类型</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>strUrl</code></td>
          <td><code>string</code></td>
          <td>要下载的文件的服务器端 URL</td>
        </tr>
      </tbody>
    </table>
    <h4>返回值</h4>
    <p><strong>bool</strong> — 下载成功返回 <code>true</code>，否则返回 <code>false</code>。</p>
    <h4>示例</h4>
    <pre v-pre><code class="language-javascript">// 下载文件示例
aras.vault.setLocalFileName('exported_data.xml');
var success = aras.vault.downloadFile('/server/Download.aspx?fileId=12345');
if (success) {
    console.log('文件下载成功');
} else {
    var errorMsg = aras.vault.getLastError();
    console.error('文件下载失败:', errorMsg);
}</code></pre>

    <hr />

    <!-- ===== 文件读取 ===== -->
    <h3>文件读取</h3>

    <h3>readText()</h3>
    <p>从当前流位置读取到流的末尾，并以字符串形式返回。如果当前流位置已在末尾，则返回空字符串。</p>
    <h4>参数</h4>
    <table>
      <thead>
        <tr>
          <th>参数</th>
          <th>类型</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>fname</code></td>
          <td><code>string</code></td>
          <td>要读取的文件名</td>
        </tr>
        <tr>
          <td><code>encoding</code></td>
          <td><code>string</code></td>
          <td>文本编码（如 "UTF-8"）</td>
        </tr>
      </tbody>
    </table>
    <h4>返回值</h4>
    <p><strong>string</strong> — 从当前流位置到末尾的字符串。如果当前流位置已在末尾，则返回空字符串 <code>""</code>。</p>
    <h4>示例</h4>
    <pre v-pre><code class="language-javascript">// 以 UTF-8 编码读取文件文本内容
var content = aras.vault.readText('C:\\temp\\sample.txt', 'UTF-8');
console.log('文件内容:', content);</code></pre>

    <h3>readBase64()</h3>
    <p>从流中指定偏移量位置读取指定数量的 Base64 编码字节。</p>
    <h4>参数</h4>
    <table>
      <thead>
        <tr>
          <th>参数</th>
          <th>类型</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>offset</code></td>
          <td><code>int</code></td>
          <td>读取的起始偏移位置（字节）</td>
        </tr>
        <tr>
          <td><code>count</code></td>
          <td><code>int</code></td>
          <td>要读取的字节数</td>
        </tr>
        <tr>
          <td><code>fname</code></td>
          <td><code>string</code></td>
          <td>要读取的文件名</td>
        </tr>
      </tbody>
    </table>
    <h4>返回值</h4>
    <p><strong>string</strong> — 从指定偏移量开始的、指定数量的 Base64 编码字节字符串。</p>
    <h4>示例</h4>
    <pre v-pre><code class="language-javascript">// 读取文件的前 1024 个字节的 Base64 编码
var base64Data = aras.vault.readBase64(0, 1024, 'C:\\temp\\image.png');
console.log('Base64 数据:', base64Data);

// 可以用于将文件内容以 Base64 格式嵌入或传输</code></pre>

    <hr />

    <!-- ===== 状态与响应 ===== -->
    <h3>状态与错误处理</h3>

    <h3>getResponse()</h3>
    <p>返回上次上传操作后服务器设置的响应数据。</p>
    <h4>参数</h4>
    <p><em>无</em></p>
    <h4>返回值</h4>
    <p><strong>string</strong> — 服务器响应数据字符串。</p>
    <h4>示例</h4>
    <pre v-pre><code class="language-javascript">// 上传完成后获取服务器响应
aras.vault.sendFilesAsync('/server/upload.aspx').then(function() {
    var serverResponse = aras.vault.getResponse();
    console.log('服务器响应:', serverResponse);
    // 解析服务器返回的 JSON 或 XML 数据
});</code></pre>

    <h3>getLastError()</h3>
    <p>获取最后一次操作的错误消息。当上传、下载或其他操作失败时，通过此方法获取详细的错误信息。</p>
    <h4>参数</h4>
    <p><em>无</em></p>
    <h4>返回值</h4>
    <p><strong>string</strong> — 最后一次操作的错误消息字符串。</p>
    <h4>示例</h4>
    <pre v-pre><code class="language-javascript">// 操作失败时获取错误信息
try {
    var result = await aras.vault.sendFilesAsync('/server/upload.aspx');
} catch (err) {
    var lastError = aras.vault.getLastError();
    console.error('操作失败:', lastError);
    // 可以展示给用户或记录日志
    alert('上传失败: ' + lastError);
}</code></pre>

    <hr />

    <!-- ===== 完整集成示例 ===== -->
    <h3>完整集成示例</h3>
    <p>以下是一个将 Vault 的常用功能组合在一起的完整示例，展示了文件选择、上传和错误处理的典型流程：</p>
    <pre v-pre><code class="language-javascript">/**
 * Aras Vault 完整上传流程示例
 * 演示文件选择、客户端数据设置、异步上传和错误处理
 */
async function vaultUploadExample() {
    var vault = aras.vault;

    // 步骤1: 清理之前的状态
    vault.clearClientData();
    vault.clearFileList();

    // 步骤2: 设置随文件一起发送的表单数据
    vault.setClientData('itemType', 'Document');
    vault.setClientData('itemId', 'A1B2C3D4E5F6');
    vault.setClientData('description', '通过 Vault 上传的文件');

    // 步骤3: 弹出文件选择对话框
    var selectedFile;
    try {
        selectedFile = await vault.selectFile();
    } catch (selectErr) {
        console.error('文件选择对话框出错:', vault.getLastError());
        return;
    }

    if (!selectedFile) {
        console.log('用户取消了文件选择');
        return;
    }

    // 步骤4: 将选中的文件添加到上传列表
    var added = vault.addFileToList(selectedFile.fileID, selectedFile.filename);
    if (!added) {
        console.error('文件添加失败:', vault.getLastError());
        return;
    }
    console.log('已添加文件:', selectedFile.filename);

    // 步骤5: 异步上传文件
    try {
        await vault.sendFilesAsync('/server/FileUpload.aspx');
        var response = vault.getResponse();
        console.log('上传成功! 服务器响应:', response);
        // 根据服务器响应做后续处理
    } catch (uploadErr) {
        console.error('上传过程中出错:', vault.getLastError());
    }
}

// 调用示例
vaultUploadExample();</code></pre>

    <hr />
    <p><em>⚠️ 已弃用。适用版本：Aras Innovator 11.0-14.x。在新版本中请使用 Aras 客户端框架提供的替代 API 进行文件操作。</em></p>
  </article>
</template>

<script setup lang="ts">
</script>

<style scoped>
.doc-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px 32px;
  line-height: 1.8;
  color: var(--color-text, #1a1a1a);
}

.doc-content h1 {
  font-size: 2rem;
  margin-bottom: 16px;
  border-bottom: 2px solid var(--color-border, #e0e0e0);
  padding-bottom: 8px;
}

.doc-content h2 {
  font-size: 1.5rem;
  margin-top: 32px;
  margin-bottom: 12px;
  border-left: 4px solid var(--color-primary, #1976d2);
  padding-left: 12px;
}

.doc-content h3 {
  font-size: 1.2rem;
  margin-top: 24px;
  margin-bottom: 8px;
  border-bottom: 1px dashed var(--color-border, #e0e0e0);
  padding-bottom: 4px;
}

.doc-content h4 {
  font-size: 1rem;
  margin-top: 16px;
  margin-bottom: 6px;
  font-weight: 600;
}

.doc-content blockquote {
  margin: 16px 0;
  padding: 12px 20px;
  background: var(--color-bg-secondary, #f5f7fa);
  border-left: 4px solid var(--color-primary, #1976d2);
  border-radius: 4px;
}

.doc-content blockquote p {
  margin: 4px 0;
}

.doc-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 12px 0 20px;
  font-size: 0.95rem;
}

.doc-content th,
.doc-content td {
  border: 1px solid var(--color-border, #e0e0e0);
  padding: 10px 14px;
  text-align: left;
}

.doc-content th {
  background: var(--color-bg-secondary, #f5f7fa);
  font-weight: 600;
  white-space: nowrap;
}

.doc-content td:first-child {
  white-space: nowrap;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
}

.doc-content code {
  background: var(--color-bg-code, #f0f0f0);
  padding: 1px 6px;
  border-radius: 3px;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9em;
  color: var(--color-code, #c7254e);
}

.doc-content pre {
  background: var(--color-bg-code, #282c34);
  border-radius: 6px;
  padding: 16px 20px;
  overflow-x: auto;
  margin: 12px 0 20px;
}

.doc-content pre code {
  background: none;
  padding: 0;
  color: var(--color-code-pre, #abb2bf);
  font-size: 0.88rem;
  line-height: 1.6;
}

.doc-content hr {
  margin: 32px 0;
  border: none;
  border-top: 1px solid var(--color-border, #e0e0e0);
}

.doc-content p {
  margin: 8px 0;
}

.doc-content ul {
  margin: 8px 0 16px;
  padding-left: 24px;
}

.doc-content ul li {
  margin: 4px 0;
}

.doc-content strong {
  font-weight: 600;
}
</style>
