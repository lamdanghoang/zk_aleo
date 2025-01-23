// The 'zksignaleov3' program.
program zksignaleov3.aleo {
    // Define a struct to represent a 64-byte string
    struct String64 {
        part0: u128,
        part1: u128,
        part2: u128,
        part3: u128
    }

    // Define a struct to represent a token ID
    struct TokenId {
        token_number: u128,
        collection_number: u128
    }

    // Define a record to represent a document
    record Document {
        owner: address,
        id: TokenId,
        metadata_uri: String64,
        view_key: field, // View key to allow access to the document
        document_id: field
    }

    // Define a record to represent the sign status of a document
    record SignStatus {
        owner: address,
        token_id: TokenId,
        status: u8 // Status of the document (0 = unsigned, 1 = signed)
    }

    // Define a record to represent the sign status of a document
    struct SignDocument {
        view_key: field,
        document_id: field,
        status: u8 // Status of the document (0 = unsigned, 1 = signed)
    }

    // Transition to create a document with a view key
    transition create_document(receiver: address, collection_id: u128, metadata: String64, view_key: field) -> (Document, SignStatus) {
        // Create a TokenId for the document
        let token_id: TokenId = TokenId {
            token_number: 0u128, // Default token number (can be customized)
            collection_number: collection_id
        };

        // Create the document
        let document: Document = Document {
            owner: receiver,
            id: token_id,
            metadata_uri: metadata,
            view_key: view_key,
            document_id: view_key
        };

        // Initialize the sign status to 0 (unsigned)
        let sign_status: SignStatus = SignStatus {
            owner: receiver,
            token_id: token_id,
            status: 0u8
        };

        // Return the document and sign status
        return (document, sign_status);
    }

    // Transition to sign a document (update its status)
    transition sign(document_id: field, view_key: field, new_status: u8) -> u8 {
        // Ensure the caller is the owner of the document
        // assert_eq(sign_status.owner, self.caller);

        // Ensure the new status is valid (0 or 1)
        assert(new_status == 0u8 || new_status == 1u8);

        // Update the sign status
        let sign_document: SignDocument = SignDocument {
            view_key: view_key,
            document_id: document_id,
            status: new_status
        };

        return new_status;
    }

    // Transition to view the sign status of a document
    transition view_status(sign_status: SignStatus) -> u8 {
        // Return the sign status
        return sign_status.status;
    }
}