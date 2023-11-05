// 变量模块方法才需要declare

// 不加export为全局，加export为局部

interface ApiRes {
  data?: any;
  message: string;
  success: boolean;
  status: number;
  timestamp: number;
  uri: string;
}

declare const enum DeleteStatus {
  FALSE = 0,
  TRUE = 1,
}
