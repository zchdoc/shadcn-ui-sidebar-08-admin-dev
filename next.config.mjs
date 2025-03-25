/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // outputFileTracingIgnores: ['./generated/client/**/*', '**/Users/**'],
  },
  webpack: (config) => {
    // 添加更多需要忽略的路径
    config.watchOptions = {
      ...config.watchOptions,
      // 使用字符串格式来忽略多个目录
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/Cookies/**',
        '**/Users/**',

        '**/AppData/**',
        '**/Local Settings/**',

        '**/Temp/**',
      ],
      poll: 1000,
    }

    // 完全禁用对系统目录的扫描
    config.snapshot = {
      ...config.snapshot,
      managedPaths: [/^(.+?\/node_modules\/)/],
      immutablePaths: [],
    }
    return config
  },
}
export default nextConfig
