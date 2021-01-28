﻿using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Elsa.Services;

namespace Elsa.Activities.Rebus.StartupTasks
{
    public class CreateSubscriptions : IStartupTask
    {
        private readonly IServiceBusFactory _serviceBusFactory;
        private readonly IEnumerable<Type> _messageTypes;

        public CreateSubscriptions(IServiceBusFactory serviceBusFactory, IEnumerable<Type> messageTypes)
        {
            _serviceBusFactory = serviceBusFactory;
            _messageTypes = messageTypes;
        }

        public int Order => 900;

        public async Task ExecuteAsync(CancellationToken cancellationToken)
        {
            foreach (var messageType in _messageTypes)
            {
                var bus = await _serviceBusFactory.GetServiceBusAsync(messageType, cancellationToken);
                await bus.Subscribe(messageType);
            }
        }
    }
}