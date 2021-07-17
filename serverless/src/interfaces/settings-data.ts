import {Settings} from "./settings";

export interface SettingsData extends Settings {
    settings: {
        settings: Settings
    }
}
