export interface DeployExecutorSchema {
  /**
   * The scope of the environment variables (e.g. www)
   */
  scope: string;

  /**
   * The environment to deploy (e.g. development or production)
   * @default "development"
   */
  environment?: 'development' | 'production';

  /**
   * The type of project (e.g app, lib, tool)
   * @default "app"
   */
  type?: 'app' | 'lib' | 'tool';

  /**
   * The project name where to deploy the .env file
   * @default `${scope}-service`
   */
  projectName?: string;
}
