﻿import {ElsaPlugin} from "../services/elsa-plugin";
import {eventBus} from '../services/event-bus';
import {ActivityDesignDisplayContext, EventTypes} from "../models";
import {h} from "@stencil/core";
import {parseJson} from "../utils/utils";

export class RunJavascriptPlugin implements ElsaPlugin {
  constructor() {
    eventBus.on(EventTypes.ActivityDesignDisplaying, this.onActivityDesignDisplaying);
  }

  onActivityDesignDisplaying(context: ActivityDesignDisplayContext) {
    const activityModel = context.activityModel;

    if (activityModel.type !== 'RunJavaScript')
      return;

    const props = activityModel.properties || [];
    const outcomes = props.find(x => x.name == 'Outcomes') || { expression: '' };
    const expression = outcomes.expression;
    context.outcomes = parseJson(expression) || ['Done'];

    if(context.outcomes.length == 0)
      context.outcomes = ['Done'];

    context.bodyDisplay = undefined;
  }
}