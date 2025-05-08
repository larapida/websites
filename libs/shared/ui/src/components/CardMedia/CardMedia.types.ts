export interface MediaCardProps {
  title: string;
  shortDescription?: string;
  wallpaper: string;
  action?: string;

  /**
   * If true the action button will be hidden
   * @default false
   */
  disabled?: boolean;

  /**
   * If true the card component will not stretch its height to 100%.
   * @default false
   */
  disableStretch?: false;
}
