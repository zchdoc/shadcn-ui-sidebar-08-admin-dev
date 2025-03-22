/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: '**/node_modules/**', // 使用字符串格式
    }

    // 添加更多需要忽略的路径
    if (config.watchOptions && config.watchOptions.ignored) {
      // 如果已经有ignored并且是字符串，转为数组
      if (typeof config.watchOptions.ignored === 'string') {
        config.watchOptions.ignored = [
          config.watchOptions.ignored,
          '**/Cookies/**', // 添加Cookies路径
          '**/Users/**', // 添加custom目录
          // 可以在这里继续添加更多目录
          // '**/some-other-dir/**',
          // '**/another-dir/**'
        ]
      }
      // 如果已经是RegExp，使用新的配置
      else {
        config.watchOptions.ignored = '**/node_modules/**'
      }
    }

    return config
  },
}
export default nextConfig
