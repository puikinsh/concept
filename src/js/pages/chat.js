// Chat Page JavaScript
import * as bootstrap from 'bootstrap';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize tooltips
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const _tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );

  // Elements
  const messageForm = document.getElementById('messageForm');
  const messageInput = document.getElementById('messageInput');
  const _sendButton = document.getElementById('sendButton');
  const chatMessages = document.querySelector('.chat-messages');
  const typingIndicator = document.getElementById('typingIndicator');
  const chatContacts = document.querySelectorAll('.chat-contact');
  const toggleContactsBtn = document.getElementById('toggleContacts');
  const chatSidebar = document.querySelector('.chat-sidebar');

  // Mobile sidebar toggle
  if (toggleContactsBtn) {
    toggleContactsBtn.addEventListener('click', () => {
      chatSidebar.classList.toggle('show');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (
        window.innerWidth < 768 &&
        !chatSidebar.contains(e.target) &&
        !toggleContactsBtn.contains(e.target) &&
        chatSidebar.classList.contains('show')
      ) {
        chatSidebar.classList.remove('show');
      }
    });
  }

  // Store conversations for each contact
  const conversations = {};

  // Initialize conversations for each contact
  chatContacts.forEach((contact, index) => {
    const contactId = contact.getAttribute('data-contact-id');
    conversations[contactId] = {
      messages: [],
      element: contact
    };

    // Add some initial messages for demonstration
    if (contactId === '1') {
      conversations[contactId].messages = [
        { text: "Hey! How's the project going?", type: 'left', time: '2:30 PM' },
        {
          text: "Hi Sarah! It's going great. I just finished the dashboard redesign.",
          type: 'right',
          time: '2:32 PM'
        },
        {
          text: "Here's the latest version for your review",
          type: 'right',
          time: '2:33 PM',
          attachment: { name: 'Dashboard_Design_v2.pdf', icon: 'fa-file-pdf' }
        },
        { text: 'Wow, this looks amazing! 🎉', type: 'left', time: '2:35 PM' },
        { text: 'I love the color scheme you chose.', type: 'left', time: '2:35 PM' }
      ];
    } else if (contactId === '2') {
      conversations[contactId].messages = [
        { text: 'Can you review the latest design?', type: 'left', time: '1:15 PM' },
        { text: "Sure, I'll take a look right now", type: 'right', time: '1:16 PM' }
      ];
    } else if (contactId === '3') {
      conversations[contactId].messages = [
        { text: 'Thanks for the update!', type: 'left', time: 'Yesterday' },
        {
          text: "You're welcome! Let me know if you need anything else.",
          type: 'right',
          time: 'Yesterday'
        }
      ];
    }
  });

  // Contact selection
  chatContacts.forEach((contact) => {
    contact.addEventListener('click', function (e) {
      e.preventDefault();

      const contactId = this.getAttribute('data-contact-id');

      // Remove active class from all contacts
      chatContacts.forEach((c) => c.classList.remove('active'));

      // Add active class to clicked contact
      this.classList.add('active');

      // Remove unread badge
      const badge = this.querySelector('.badge');
      if (badge) {
        badge.remove();
      }

      // Update chat header
      updateChatHeader(this);

      // Load conversation for this contact
      loadConversation(contactId);

      // Close sidebar on mobile after selection
      if (window.innerWidth < 768) {
        chatSidebar.classList.remove('show');
      }

      // Scroll to bottom
      scrollToBottom();
    });
  });

  // Send message functionality
  messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage();
  });

  // Send message on Enter (without Shift)
  messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Typing indicator simulation
  let typingTimer;
  messageInput.addEventListener('input', function () {
    clearTimeout(typingTimer);

    if (this.value.trim()) {
      // In a real app, this would notify the other user
      typingTimer = setTimeout(() => {
        // Hide typing indicator after 1 second of no typing
      }, 1000);
    }
  });

  // Function to load conversation for a contact
  function loadConversation(contactId) {
    // Clear current messages (except typing indicator)
    const messagesContainer = document.querySelector('.chat-messages');
    const messages = messagesContainer.querySelectorAll('.message:not(#typingIndicator)');
    messages.forEach((msg) => msg.remove());

    // Remove date dividers
    const dateDividers = messagesContainer.querySelectorAll('.text-center');
    dateDividers.forEach((divider) => divider.remove());

    // Add date divider
    const dateDivider = document.createElement('div');
    dateDivider.className = 'text-center my-3';
    dateDivider.innerHTML = '<span class="badge bg-light text-muted">Today</span>';
    messagesContainer.insertBefore(dateDivider, typingIndicator);

    // Load messages for this conversation
    const conversation = conversations[contactId];
    if (conversation && conversation.messages) {
      conversation.messages.forEach((msg) => {
        const messageDiv = createMessageElement(msg.text, msg.type, msg.time, msg.attachment);
        messagesContainer.insertBefore(messageDiv, typingIndicator);
      });
    }

    // Store current contact ID
    messagesContainer.setAttribute('data-current-contact', contactId);
  }

  // Function to send a message
  function sendMessage() {
    const messageText = messageInput.value.trim();

    if (!messageText) return;

    // Get current contact
    const currentContactId = chatMessages.getAttribute('data-current-contact') || '1';

    // Create message data
    const messageData = {
      text: messageText,
      type: 'right',
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    };

    // Store message in conversation
    if (conversations[currentContactId]) {
      conversations[currentContactId].messages.push(messageData);
    }

    // Create message element
    const messageDiv = createMessageElement(messageText, 'right');

    // Remove typing indicator if shown
    typingIndicator.style.display = 'none';

    // Add message to chat
    chatMessages.insertBefore(messageDiv, typingIndicator);

    // Clear input
    messageInput.value = '';

    // Scroll to bottom
    scrollToBottom();

    // Simulate received message after 1-2 seconds
    setTimeout(
      () => {
        simulateReceivedMessage();
      },
      1000 + Math.random() * 1000
    );
  }

  // Function to create a message element
  function createMessageElement(text, type = 'left', timeStr = null, attachment = null) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type} mb-3`;

    const time =
      timeStr ||
      new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
      });

    if (type === 'right') {
      let messageContent = '';
      if (attachment) {
        messageContent = `
                    <div class="message-attachment mb-2">
                        <i class="fas ${attachment.icon} text-danger me-2"></i>
                        <span>${attachment.name}</span>
                        <a href="#" class="ms-2"><i class="fas fa-download"></i></a>
                    </div>
                `;
      }
      messageContent += `<p class="mb-0">${escapeHtml(text)}</p>`;

      messageDiv.innerHTML = `
                <div class="d-flex align-items-end justify-content-end">
                    <div>
                        <div class="message-bubble">
                            ${messageContent}
                        </div>
                        <small class="text-muted">${time} <i class="fas fa-check-double text-primary ms-1"></i></small>
                    </div>
                </div>
            `;
    } else {
      const activeContact = document.querySelector('.chat-contact.active');
      const _name = activeContact ? activeContact.querySelector('h6').textContent : 'User';
      const avatarElement = activeContact
        ? activeContact.querySelector('.avatar-circle').cloneNode(true)
        : null;

      // Create avatar HTML
      let avatarHtml = '';
      if (avatarElement) {
        avatarElement.style.width = '32px';
        avatarElement.style.height = '32px';
        avatarElement.style.fontSize = '14px';
        avatarElement.classList.add('me-2');
        avatarHtml = avatarElement.outerHTML;
      } else {
        avatarHtml = `<div class="avatar-circle bg-secondary text-white rounded-circle me-2 d-flex align-items-center justify-content-center" style="width: 32px; height: 32px; font-size: 14px;">
                    <span class="fw-bold">U</span>
                </div>`;
      }

      messageDiv.innerHTML = `
                <div class="d-flex align-items-end">
                    ${avatarHtml}
                    <div>
                        <div class="message-bubble">
                            <p class="mb-0">${escapeHtml(text)}</p>
                        </div>
                        <small class="text-muted">${time}</small>
                    </div>
                </div>
            `;
    }

    return messageDiv;
  }

  // Function to simulate received message
  function simulateReceivedMessage() {
    // Get current contact
    const currentContactId = chatMessages.getAttribute('data-current-contact') || '1';

    // Show typing indicator
    typingIndicator.style.display = 'block';
    scrollToBottom();

    // Simulate typing time
    setTimeout(
      () => {
        typingIndicator.style.display = 'none';

        // Random responses based on contact
        const responsesByContact = {
          1: [
            // Sarah Johnson
            'That sounds great! Keep up the good work.',
            'I really appreciate your attention to detail.',
            'Can we schedule a meeting to discuss this further?',
            'Excellent progress! 🎉',
            'Let me review this and get back to you.'
          ],
          2: [
            // Mike Davis
            'Thanks for looking into this!',
            "I'll make those changes right away.",
            "Good point, I hadn't considered that.",
            'When do you need this completed by?',
            "I'll send you the updated version soon."
          ],
          3: [
            // Emma Wilson
            'No problem at all!',
            'Happy to help anytime.',
            'That works perfectly for me.',
            'Looking forward to it!',
            'Thanks for the quick response.'
          ],
          4: [
            // Design Team
            'Team: Great idea!',
            "Team: Let's discuss this in our next standup.",
            'Team: I can help with that part.',
            "Team: Agreed, let's move forward.",
            'Team: Nice work everyone! 🚀'
          ],
          5: [
            // Alex Brown
            'See you at the meeting!',
            "I'll prepare the agenda.",
            'Confirmed for 3 PM.',
            'Should we invite the stakeholders?',
            "I'll book the conference room."
          ]
        };

        const responses = responsesByContact[currentContactId] || [
          'That sounds great!',
          'I agree with you.',
          'Thanks for sharing!'
        ];

        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const time = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

        // Store message in conversation
        if (conversations[currentContactId]) {
          conversations[currentContactId].messages.push({
            text: randomResponse,
            type: 'left',
            time
          });
        }

        const messageDiv = createMessageElement(randomResponse, 'left');

        chatMessages.insertBefore(messageDiv, typingIndicator);
        scrollToBottom();

        // Update last message in contact list
        updateContactLastMessage(randomResponse);
      },
      1500 + Math.random() * 1500
    );
  }

  // Function to update chat header
  function updateChatHeader(contactElement) {
    if (!contactElement) return;

    const name = contactElement.querySelector('h6')?.textContent || 'User';
    const avatarElement = contactElement.querySelector('.avatar-circle');
    const statusIndicator = contactElement.querySelector('.position-absolute');
    let status = 'Offline';

    if (statusIndicator) {
      if (statusIndicator.classList.contains('bg-success')) status = 'Online';
      else if (statusIndicator.classList.contains('bg-warning')) status = 'Away';
    }

    const chatHeader = document.querySelector('.chat-header');
    if (!chatHeader) return;

    const headerAvatar = chatHeader.querySelector('.avatar-circle');
    const headerName = chatHeader.querySelector('h5');
    const headerStatus = chatHeader.querySelector('small');

    // Update avatar if both exist
    if (avatarElement && headerAvatar && headerAvatar.parentElement) {
      const newAvatar = avatarElement.cloneNode(true);
      newAvatar.style.width = '40px';
      newAvatar.style.height = '40px';
      newAvatar.style.fontSize = '16px';
      newAvatar.classList.remove('me-3');
      newAvatar.classList.add('me-3');
      headerAvatar.parentElement.innerHTML = newAvatar.outerHTML;
    }

    // Update name and status if elements exist
    if (headerName) headerName.textContent = name;
    if (headerStatus) {
      headerStatus.textContent = status;
      headerStatus.className =
        status === 'Online' ? 'text-success' : status === 'Away' ? 'text-warning' : 'text-muted';
    }
  }

  // Function to update contact's last message
  function updateContactLastMessage(message) {
    const activeContact = document.querySelector('.chat-contact.active');
    if (activeContact) {
      const lastMessage = activeContact.querySelector('.text-truncate');
      const timeElement = activeContact.querySelector('.text-end small');

      if (lastMessage) {
        lastMessage.textContent = message;
      }

      if (timeElement) {
        const time = new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit'
        });
        timeElement.textContent = time;
      }
    }
  }

  // Function to scroll to bottom of chat
  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Function to escape HTML
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Initial setup - load first conversation
  const activeContact = document.querySelector('.chat-contact.active');
  if (activeContact) {
    const contactId = activeContact.getAttribute('data-contact-id');
    loadConversation(contactId);
    updateChatHeader(activeContact);
  }

  // Initial scroll to bottom
  scrollToBottom();

  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth >= 768) {
        chatSidebar.classList.remove('show');
      }
    }, 250);
  });
});
