import { Label } from "@storyteller/ui-label";

export const BillingSettingsPane = () => (
  <div className="space-y-4 pt-3 text-base-fg">
    <Label>fal.ai 计费</Label>
    <p className="text-sm opacity-70">
      生成费用由服务端配置的 fal.ai 账号承担，按实际调用的模型计费。
      请联系服务管理员查看余额和用量。
    </p>
    <p className="text-sm opacity-70">
      当前客户端不显示实时费用。生成前请确认模型、数量和视频时长。
    </p>
  </div>
);
