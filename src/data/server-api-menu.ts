import type { ArasDocNode } from './aras-menu'

/**
 * 服务器 API 参考菜单
 * 基于 Aras Innovator 15.0.1 .NET API Reference（2025R / R37+）
 * 完整涵盖 Aras.IOM、Aras.IOM.OAuth、Aras.IOME、Aras.Net 四个命名空间
 * 6 组，51 个文档
 */
export const serverApiMenu: ArasDocNode[] = [
  // ═══════════════════════════════════════════════
  // Group 1: Aras.IOM — Innovator 类 (8 docs)
  // ═══════════════════════════════════════════════
  {
    id: 'server-api-iom-innovator',
    name: 'IOM 核心 — Innovator 类',
    type: 'group',
    children: [
      { id: 'server-api-innovator-overview', name: 'Innovator 类概述', type: 'item', path: '/server-api/innovator-overview' },
      { id: 'server-api-innovator-item-creation', name: 'newItem / newResult / newError', type: 'item', path: '/server-api/innovator-item-creation' },
      { id: 'server-api-innovator-aml-sql', name: 'applyAML / applySQL / applySQLWithParameters', type: 'item', path: '/server-api/innovator-aml-sql' },
      { id: 'server-api-innovator-method', name: 'applyMethod 详解', type: 'item', path: '/server-api/innovator-method' },
      { id: 'server-api-innovator-query', name: 'getItemById / getItemByKeyedName / getItemInDom', type: 'item', path: '/server-api/innovator-query' },
      { id: 'server-api-innovator-file', name: 'getFileUrl / getFileUrls / getChecksum', type: 'item', path: '/server-api/innovator-file' },
      { id: 'server-api-innovator-utility', name: '工具方法与杂项', type: 'item', path: '/server-api/innovator-utility' }
    ]
  },

  // ═══════════════════════════════════════════════
  // Group 2: Aras.IOM — Item 类 (14 docs)
  // ═══════════════════════════════════════════════
  {
    id: 'server-api-iom-item',
    name: 'IOM 核心 — Item 类',
    type: 'group',
    children: [
      { id: 'server-api-item-overview', name: 'Item 类概述与内部结构', type: 'item', path: '/server-api/item-overview' },
      { id: 'server-api-item-properties', name: '属性操作 (get/set/removeProperty)', type: 'item', path: '/server-api/item-properties' },
      { id: 'server-api-item-property-condition', name: '属性条件 (get/setPropertyCondition)', type: 'item', path: '/server-api/item-property-condition' },
      { id: 'server-api-item-property-attribute', name: '属性特性 (PropertyAttribute)', type: 'item', path: '/server-api/item-property-attribute' },
      { id: 'server-api-item-attributes', name: 'Attribute 操作', type: 'item', path: '/server-api/item-attributes' },
      { id: 'server-api-item-identity', name: '标识与类型', type: 'item', path: '/server-api/item-identity' },
      { id: 'server-api-item-aml', name: 'AML/XML 操作', type: 'item', path: '/server-api/item-aml' },
      { id: 'server-api-item-apply', name: 'apply 与服务器通信', type: 'item', path: '/server-api/item-apply' },
      { id: 'server-api-item-relationships', name: '关系操作', type: 'item', path: '/server-api/item-relationships' },
      { id: 'server-api-item-collection', name: '集合与遍历', type: 'item', path: '/server-api/item-collection' },
      { id: 'server-api-item-logical', name: '逻辑条件', type: 'item', path: '/server-api/item-logical' },
      { id: 'server-api-item-files', name: '文件管理', type: 'item', path: '/server-api/item-files' },
      { id: 'server-api-item-lifecycle', name: '生命周期与工作流', type: 'item', path: '/server-api/item-lifecycle' },
      { id: 'server-api-item-errors', name: '错误处理', type: 'item', path: '/server-api/item-errors' }
    ]
  },

  // ═══════════════════════════════════════════════
  // Group 3: Aras.IOM 其他类 (6 docs)
  // ═══════════════════════════════════════════════
  {
    id: 'server-api-iom-others',
    name: 'IOM 核心 — 其他类型',
    type: 'group',
    children: [
      { id: 'server-api-connection-http', name: 'HTTP 连接实现', type: 'item', path: '/server-api/connection-http' },
      { id: 'server-api-i18n-session', name: 'I18NSessionContext', type: 'item', path: '/server-api/i18n-session' },
      { id: 'server-api-factory-request', name: 'IomFactory / RequestFactory', type: 'item', path: '/server-api/factory-request' },
      { id: 'server-api-enums-file', name: 'FetchFileMode / UrlType / VaultUrlType', type: 'item', path: '/server-api/enums-file' },
      { id: 'server-api-http-params', name: 'HttpConnectionParameters', type: 'item', path: '/server-api/http-params' },
      { id: 'server-api-aras-item-node-list', name: 'ArasItemNodeList', type: 'item', path: '/server-api/aras-item-node-list' }
    ]
  },

  // ═══════════════════════════════════════════════
  // Group 4: Aras.IOM.OAuth 认证 (12 docs)
  // ═══════════════════════════════════════════════
  {
    id: 'server-api-oauth',
    name: 'OAuth 认证',
    type: 'group',
    children: [
      { id: 'server-api-oauth-overview', name: 'OAuth 命名空间概述', type: 'item', path: '/server-api/oauth-overview' },
      { id: 'server-api-oauth-grant-type', name: 'GrantType 与枚举', type: 'item', path: '/server-api/oauth-grant-type' },
      { id: 'server-api-oauth-interfaces', name: 'OAuth 接口体系', type: 'item', path: '/server-api/oauth-interfaces' },
      { id: 'server-api-oauth-token-provider-options', name: 'TokenProviderOptions 体系', type: 'item', path: '/server-api/oauth-token-provider-options' },
      { id: 'server-api-oauth-password', name: 'PasswordTokenProvider', type: 'item', path: '/server-api/oauth-password' },
      { id: 'server-api-oauth-authcode', name: 'AuthorizationFlowTokenProvider', type: 'item', path: '/server-api/oauth-authcode' },
      { id: 'server-api-oauth-certificate', name: 'CertificateTokenProvider', type: 'item', path: '/server-api/oauth-certificate' },
      { id: 'server-api-oauth-windows', name: 'WindowsTokenProvider', type: 'item', path: '/server-api/oauth-windows' },
      { id: 'server-api-oauth-impersonate', name: 'ImpersonateTokenProvider', type: 'item', path: '/server-api/oauth-impersonate' },
      { id: 'server-api-oauth-refresh', name: 'RefreshTokenProvider', type: 'item', path: '/server-api/oauth-refresh' },
      { id: 'server-api-oauth-jwt-bearer', name: 'JwtBearerClientAssertionProvider', type: 'item', path: '/server-api/oauth-jwt-bearer' },
      { id: 'server-api-oauth-discovery', name: 'Discovery 与异常', type: 'item', path: '/server-api/oauth-discovery' }
    ]
  },

  // ═══════════════════════════════════════════════
  // Group 5: Aras.IOME 文件管理 (10 docs)
  // ═══════════════════════════════════════════════
  {
    id: 'server-api-iome',
    name: 'IOME 文件管理',
    type: 'group',
    children: [
      { id: 'server-api-iome-overview', name: 'IOME 命名空间概述', type: 'item', path: '/server-api/iome-overview' },
      { id: 'server-api-iome-checkin', name: 'CheckinManager', type: 'item', path: '/server-api/iome-checkin' },
      { id: 'server-api-iome-checkout', name: 'CheckoutManager', type: 'item', path: '/server-api/iome-checkout' },
      { id: 'server-api-iome-checkin-events', name: '签入事件体系', type: 'item', path: '/server-api/iome-checkin-events' },
      { id: 'server-api-iome-upload-events', name: '上传事件体系', type: 'item', path: '/server-api/iome-upload-events' },
      { id: 'server-api-iome-download-events', name: '下载事件体系', type: 'item', path: '/server-api/iome-download-events' },
      { id: 'server-api-iome-results', name: '操作结果类型', type: 'item', path: '/server-api/iome-results' },
      { id: 'server-api-iome-configuration', name: '配置构建器', type: 'item', path: '/server-api/iome-configuration' },
      { id: 'server-api-iome-exceptions', name: '异常类型', type: 'item', path: '/server-api/iome-exceptions' },
      { id: 'server-api-iome-delegates', name: '事件委托一览', type: 'item', path: '/server-api/iome-delegates' }
    ]
  },

  // ═══════════════════════════════════════════════
  // Group 6: Aras.Net (1 doc)
  // ═══════════════════════════════════════════════
  {
    id: 'server-api-arasnet',
    name: 'Aras.Net',
    type: 'group',
    children: [
      { id: 'server-api-arasnet', name: 'WindowsAuthHelperComConnector', type: 'item', path: '/server-api/arasnet' }
    ]
  }
]
